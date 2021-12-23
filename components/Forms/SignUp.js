import { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useHttp from '../../hooks/useHttp';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { reqRegister } from '../../services/api/auth';
import authContext from '../../helpers/auth-context';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link as MUILink } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import LoadingSpinner from '../Utils/LoadingSpinner';

const SignUp = () => {
	const { authenticate } = useContext(authContext);
	const router = useRouter();
	const { isLoading, error, sendRequest, data, clearError } = useHttp();
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm();

	useEffect(() => {
		const sub = watch((value, { name }) => {
			if (error && Object.keys(error).includes(name)) {
				clearError();
			}
		});
		return () => sub.unsubscribe();
	}, [watch, clearError, error]);

	useEffect(() => {
		if (!error && data) {
			authenticate(data.user);
			router.push('/');
		}
	}, [data, error, router, authenticate]);

	const onSubmit = formData => {
		sendRequest(reqRegister, formData);
	};

	return (
		<Container component="main" maxWidth="xs">
			<LoadingSpinner isLoading={isLoading} />
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
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Controller
								name="firstName"
								control={control}
								rules={{ required: 'First name is required' }}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										required
										fullWidth
										label="First Name"
										autoFocus
										error={!!errors.firstName}
									/>
								)}
							/>
							{errors.firstName && (
								<Typography variant="caption" color="error">
									{errors.firstName.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="lastName"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField {...field} fullWidth label="Last Name" />
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								rules={{
									required: 'Email is required',
									pattern: { value: /^\S+@\S+$/i, message: 'Email is invalid' },
								}}
								render={({ field }) => (
									<TextField
										{...field}
										required
										fullWidth
										type="email"
										label="Email Address"
										error={!!errors.email || (error && !!error.email)}
									/>
								)}
							/>
							{errors.email && (
								<Typography variant="caption" color="error">
									{errors.email.message}
								</Typography>
							)}
							{error && error.email && (
								<Typography variant="caption" color="error">
									{error.email}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="password"
								control={control}
								defaultValue=""
								rules={{ required: 'Password is required' }}
								render={({ field }) => (
									<TextField
										{...field}
										required
										fullWidth
										label="Password"
										type="password"
										error={!!errors.password}
									/>
								)}
							/>
							{errors.password && (
								<Typography variant="caption" color="error">
									{errors.password.message}
								</Typography>
							)}
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={Object.keys(errors).length > 0}
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
