import { useReducer, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Backdrop, CircularProgress, Link as MUILink } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'FORM_CHANGE':
			const newState = {
				controls: {
					...state.controls,
					[action.control]: {
						value: action.value,
						isValid: action.isValid,
						isTouched: true,
					},
				},
			};
			newState.isValid = Object.values(newState.controls).every(
				control => control.isValid,
			);
			return newState;
		default:
			return state;
	}
};

const SignUp = () => {
	const router = useRouter();
	const { isLoading, error, sendRequest, data } = useHttp();
	const [form, dispatch] = useReducer(formReducer, {
		controls: {
			email: { value: '', isValid: false, isTouched: false },
			password: { value: '', isValid: false, isTouched: false },
			firstName: { value: '', isValid: false, isTouched: false },
			lastName: { value: '', isValid: true, isTouched: false },
		},
		isValid: false,
	});

	useEffect(() => {
		if (!error && data) {
			console.log(data);
			router.push('/');
		}
	}, [data, error, router]);

	const handleSubmit = event => {
		event.preventDefault();
		const user = {
			email: form.controls.email.value,
			password: form.controls.password.value,
			firstName: form.controls.firstName.value,
			lastName: form.controls.lastName.value,
		};

		sendRequest(async () => {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}

			return data;
		});
	};

	const onChangeHandler = (event, controlName) => {
		const value = event.target.value;
		let isValid = false;
		switch (controlName) {
			case 'email':
				isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
				break;
			case 'password':
				isValid = value.trim().length >= 6;
				break;
			case 'firstName':
				isValid = value.trim().length > 0;
				break;
		}

		dispatch({ type: 'FORM_CHANGE', control: controlName, value, isValid });
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Backdrop open={isLoading} styles={{ zIndex: 100 }}>
				<CircularProgress style={{ color: '#cecece' }} />
			</Backdrop>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={event => onChangeHandler(event, 'firstName')}
								error={
									!form.controls.firstName.isValid &&
									form.controls.firstName.isTouched
								}
							/>
							<Typography variant="caption" color="error">
								{!form.controls.firstName.isValid &&
									form.controls.firstName.isTouched &&
									'First name is required'}
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField fullWidth id="lastName" label="Last Name" />
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								type="email"
								id="email"
								label="Email Address"
								onChange={event => onChangeHandler(event, 'email')}
								error={
									!form.controls.email.isValid && form.controls.email.isTouched
								}
							/>
							<Typography variant="caption" color="error">
								{!form.controls.email.isValid &&
									form.controls.email.isTouched &&
									'Please Enter a valid email'}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Password"
								type="password"
								id="password"
								onChange={event => onChangeHandler(event, 'password')}
								error={
									!form.controls.password.isValid &&
									form.controls.password.isTouched
								}
							/>
							<Typography variant="caption" color="error">
								{!form.controls.password.isValid &&
									form.controls.password.isTouched &&
									'Password must be atleast 6 characters long'}
							</Typography>
						</Grid>
					</Grid>
					{error && (
						<Typography variant="body1" color="error" sx={{ mt: 2 }}>
							{error}
						</Typography>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={!form.isValid}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link href="/login" passHref>
								<MUILink variant="body1">
									Already have an account? Sign in
								</MUILink>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default SignUp;
