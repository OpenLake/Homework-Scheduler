import { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useHttp from '../../hooks/useHttp';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { reqLogin } from '../../services/api/auth';
import authContext from '../../helpers/auth-context';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link as MUILink } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import LoadingSpinner from '../Utils/LoadingSpinner';

const LogIn = () => {
	const { authenticate } = useContext(authContext);
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm();
	const router = useRouter();
	const { isLoading, error, sendRequest, clearError } = useHttp();

	useEffect(() => {
		const sub = watch((value, { name }) => {
			if (error && Object.keys(error).includes(name)) {
				clearError();
			}
		});
		return () => sub.unsubscribe();
	}, [watch, error, clearError]);

	const onSubmit = formData => {
		sendRequest(reqLogin, formData, data => {
			authenticate(data.user);
			router.push('/');
		});
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
					Log In
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Controller
								name="email"
								control={control}
								rules={{
									required: 'Email is required',
									pattern: {
										value: /^\S+@\S+$/i,
										message: 'Email must be valid',
									},
								}}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										autoFocus
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
								rules={{
									required: 'Password is required',
								}}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										required
										fullWidth
										label="Password"
										type="password"
										error={!!errors.password || (error && !!error.password)}
									/>
								)}
							/>
							{errors.password && (
								<Typography variant="caption" color="error">
									{errors.password.message}
								</Typography>
							)}
							{error && error.password && (
								<Typography variant="caption" color="error">
									{error.password}
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
