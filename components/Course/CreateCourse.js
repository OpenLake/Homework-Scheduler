import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import useForm from '../../hooks/useForm';

import { reqCreateCourse } from '../../services/api/courses';
import Button from '@mui/material/Button';
import Input from '../Utils/Input';
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
	const { isLoading, error, sendRequest, data } = useHttp();
	const { formState, onChange } = useForm({
		controls: {
			courseName: { value: '', isValid: false },
			courseCode: { value: '', isValid: false },
		},
		isValid: false,
	});

	const createCourse = () => {
		const data = {
			courseName: formState.controls.courseName.value,
			courseCode: formState.controls.courseCode.value,
			courseType,
		};

		sendRequest(reqCreateCourse, data);
	};

	useEffect(() => {
		if (!error && data) {
			console.log(data);
		}
	}, [data, error]);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<LoadingSpinner isLoading={isLoading} />
			<DialogTitle>Create Course</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Enter the course details below to create a new course.
				</DialogContentText>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid item xs={12}>
						<Input
							autoFocus
							required
							fullWidth
							type="text"
							id="courseName"
							label="Course Name"
							onChange={onChange}
							errorText="Please enter a course name."
							validator={value => value.trim().length > 0}
						/>
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
						<Input
							required
							fullWidth
							type="text"
							id="courseCode"
							label="Course Code"
							onChange={onChange}
							errorText="Please enter a course code."
							validator={value => value.trim().length > 0}
						/>
						{error && (
							<Typography variant="body2" mt={2} color="error">
								{error}
							</Typography>
						)}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose}>Cancel</Button>
				<Button onClick={createCourse} disabled={!formState.isValid}>
					<Icon>send</Icon>
					Create Course
				</Button>
			</DialogActions>
		</Dialog>
	);
}
