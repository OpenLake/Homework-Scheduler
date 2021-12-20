import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import { useForm, Controller } from 'react-hook-form';

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

export default function CreateCourse(props) {
	const [courseType, setCourseType] = useState('public');
	const { isLoading, error, sendRequest, data, clearError } = useHttp();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const createCourse = formData => {
		sendRequest(reqCreateCourse, { ...formData, courseType });
	};

	const onClose = () => {
		clearError();
		props.handleClose();
	};

	useEffect(() => {
		if (!error && data) {
			console.log(data);
		}
	}, [data, error]);

	return (
		<Dialog open={props.open} onClose={onClose}>
			<LoadingSpinner isLoading={isLoading} />
			<DialogTitle>Create Course</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Enter the course details below to create a new course.
				</DialogContentText>
				<Grid container spacing={2} sx={{ mt: 2 }} component="form" noValidate>
					<Grid item xs={12}>
						<Controller
							name="courseName"
							control={control}
							rules={{ required: 'Course Name is required' }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Course Name"
									autoFocus
									required
									fullWidth
									type="text"
								/>
							)}
						/>
						{errors.courseName && (
							<Typography variant="caption" color="error">
								{errors.courseName.message}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Course Type</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Course Type"
								value={courseType}
								onChange={e => setCourseType(e.target.value)}
							>
								<MenuItem value="public">Public</MenuItem>
								<MenuItem value="private">Private</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="courseCode"
							control={control}
							rules={{ required: 'Course Code is required' }}
							render={({ field }) => (
								<TextField
									{...field}
									required
									fullWidth
									type="text"
									label="Course Code"
								/>
							)}
						/>
						{errors.courseCode && (
							<Typography variant="caption" color="error">
								{errors.courseCode.message}
							</Typography>
						)}
						{error && error.courseCode && (
							<Typography variant="body2" mt={2} color="error">
								{error.courseCode}
							</Typography>
						)}
						{/* General Message */}
						{error && error.message && (
							<Typography variant="body2" mt={2} color="error">
								{error.message}
							</Typography>
						)}
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
