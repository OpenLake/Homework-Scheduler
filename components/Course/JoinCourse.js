import { useState } from 'react';
import useHttp from '../../hooks/useHttp';

import { reqJoinCourse } from '../../services/api/courses';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingSpinner from '../Utils/LoadingSpinner';

export default function CreateCourse(props) {
	const { isLoading, error, data, sendRequest } = useHttp();
	const [courseCode, setCourseCode] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const createCourse = () => {
		sendRequest(reqJoinCourse, courseCode);
	};

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Join Course</DialogTitle>
			<LoadingSpinner isLoading={isLoading} />
			<DialogContent>
				<DialogContentText>
					Enter the course code below to join a course.
				</DialogContentText>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid item xs={12}>
						<TextField
							autoFocus
							required
							fullWidth
							type="text"
							id="courseCode"
							label="Course Code"
							value={courseCode}
							onChange={e => setCourseCode(e.target.value)}
							onBlur={() => setIsTouched(true)}
							error={isTouched && courseCode === ''}
						/>
						{!courseCode && isTouched && (
							<Typography variant="caption" color="error">
								Please enter a course code.
							</Typography>
						)}
						{error && (
							<Typography variant="caption" color="error">
								{error}
							</Typography>
						)}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose}>Cancel</Button>
				<Button onClick={createCourse} disabled={!courseCode}>
					Join
					<Icon sx={{ ml: 1 }}>send</Icon>
				</Button>
			</DialogActions>
		</Dialog>
	);
}
