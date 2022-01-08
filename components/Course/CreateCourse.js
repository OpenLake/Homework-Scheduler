import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useHttp from '../../hooks/useHttp';
import webRoutes from '../../helpers/webRoutes';

import { reqCreateCourse } from '../../services/api/courses';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import LoadingSpinner from '../Utils/LoadingSpinner';
import { useRouter } from 'next/router';

export default function CreateCourse(props) {
	const router = useRouter();
	const [type, setCourseType] = useState('public');
	const { isLoading, error, sendRequest, clearError } = useHttp();
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		watch,
	} = useForm();

	const createCourse = formData => {
		sendRequest(reqCreateCourse, { ...formData, type }, data => {
			router.push(webRoutes.course(data._id).path);
		});
	};

	const onClose = () => {
		clearError();
		reset({
			name: '',
			code: '',
			description: '',
		});
		props.handleClose();
	};

	useEffect(() => {
		const sub = watch((value, { name }) => {
			if (error && name === 'code') {
				clearError();
			}
		});
		return () => sub.unsubscribe();
	}, [watch, error, clearError]);

	return (
		<Dialog open={props.open} onClose={onClose}>
			<LoadingSpinner isLoading={isLoading} />
			<DialogTitle>Create Course</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Enter the course details below to create a new course.
				</DialogContentText>
				<Grid container spacing={2} sx={{ mt: 2 }} component="form" noValidate>
					<Grid item xs={12} sm={6}>
						<Controller
							name="name"
							control={control}
							rules={{ required: 'Course Name is required' }}
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...field}
									label="Course Name"
									autoFocus
									required
									fullWidth
									type="text"
									error={!!errors.name}
								/>
							)}
						/>
						{errors.name && (
							<Typography variant="caption" color="error">
								{errors.name.message}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<InputLabel id="courseType">Course Type</InputLabel>
							<Select
								labelId="courseType"
								label="Course Type"
								value={type}
								onChange={e => setCourseType(e.target.value)}
							>
								<MenuItem value="public">Public</MenuItem>
								<MenuItem value="private">Private</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="code"
							control={control}
							rules={{ required: 'Course Code is required' }}
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...field}
									required
									fullWidth
									type="text"
									label="Course Code"
									error={!!errors.code || (error && !!error.code)}
								/>
							)}
						/>
						{errors.code && (
							<Typography variant="caption" color="error">
								{errors.code.message}
							</Typography>
						)}
						{error && error.code && (
							<Typography variant="caption" mt={2} color="error">
								{error.code}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...field}
									label="Course Description"
									fullWidth
									type="text"
									multiline
									rows={4}
								/>
							)}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					disabled={Object.keys(errors).length > 0}
					onClick={handleSubmit(createCourse)}
				>
					<Icon>send</Icon>
					Create Course
				</Button>
			</DialogActions>
		</Dialog>
	);
}
