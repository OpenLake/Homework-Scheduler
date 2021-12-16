import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import useHttp from '../../hooks/useHttp';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Backdrop, CircularProgress, Link as MUILink } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Input from '../Utils/Input';

const SignUp = () => {
	const router = useRouter();
	const { isLoading, error, sendRequest, data } = useHttp();
	const { formState, onChange } = useForm({
		controls: {
			email: { value: '', isValid: false },
			password: { value: '', isValid: false },
			firstName: { value: '', isValid: false },
			lastName: { value: '', isValid: true },
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
			email: formState.controls.email.value,
			password: formState.controls.password.value,
			firstName: formState.controls.firstName.value,
			lastName: formState.controls.lastName.value,
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

	return (
		<Container component="main" maxWidth="xs">
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
							<Input
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={onChange}
								validator={value => value.trim().length > 0}
								errorText="Please enter your first name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Input fullWidth id="lastName" label="Last Name" />
						</Grid>
						<Grid item xs={12}>
							<Input
								required
								fullWidth
								type="email"
								id="email"
								label="Email Address"
								onChange={onChange}
								validator={value => value.includes('@')}
								errorText="Please enter a valid email address"
							/>
						</Grid>
						<Grid item xs={12}>
							<Input
								required
								fullWidth
								label="Password"
								type="password"
								id="password"
								onChange={onChange}
								validator={value => value.trim().length >= 6}
								errorText="Password must be at least 6 characters"
							/>
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
						disabled={!formState.isValid}
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
