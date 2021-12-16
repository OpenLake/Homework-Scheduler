import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import useHttp from '../../hooks/useHttp';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Backdrop, Link as MUILink } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Input from '../Utils/Input';

const LogIn = () => {
	const { formState, onChange } = useForm({
		controls: {
			email: { value: '', isValid: false },
			password: { value: '', isValid: false },
		},
		isValid: false,
	});

	const router = useRouter();
	const { isLoading, error, sendRequest, data } = useHttp();

	useEffect(() => {
		if (!error && data) {
			console.log(data);
			router.push('/');
		}
	}, [error, data, router]);

	const handleSubmit = event => {
		event.preventDefault();
		const user = {
			email: formState.controls.email.value,
			password: formState.controls.password.value,
		};

		sendRequest(async () => {
			const response = await fetch('/api/auth/login', {
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
			<Backdrop open={isLoading}>
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
					Log In
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Input
								autoFocus
								required
								fullWidth
								type="email"
								id="email"
								label="Email Address"
								onChange={onChange}
								errorText="Please enter a valid email address."
								validator={value => value.includes('@')}
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
								errorText="Please enter a valid password(at least 6 characters)."
								validator={value => value.length >= 6}
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
						Log In
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link href="/signup" passHref>
								<MUILink variant="body1">
									{"Don't"} have an account? Sign Up
								</MUILink>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default LogIn;
