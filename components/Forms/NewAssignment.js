import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import useHttp from '../../hooks/useHttp';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
	reqCreateAssignment,
	fetchAssignmentCountByDate,
} from '../../services/api/assignments';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Icon } from '@mui/material';
import LoadingSpinner from '../Utils/LoadingSpinner';
import DateTimePicker from '../Utils/DateAndTimePicker';
import { format, isValid } from 'date-fns';

const TextEditor = dynamic(() => import('../Utils/TextEditor'), { ssr: false });

const NewForm = ({ courseId }) => {
	const router = useRouter();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [dueDate, setDueDate] = useState(new Date());
	const { isLoading, sendRequest } = useHttp();
	const [assignmentsCount, setAssignmentsCount] = useState({});
	const [loadingCount, setLoadingCount] = useState(true);
	const [dateError, setDateError] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = formData => {
		const html = stateToHTML(editorState.getCurrentContent());

		if (html === '<p><br></p>' || html === '<p></p>') {
			alert('Please enter a description');
			return;
		}

		if (dateError) {
			return;
		}

		formData.description = html;
		formData.courseId = courseId;
		formData.dueDate = dueDate;

		sendRequest(reqCreateAssignment, formData, () => {
			router.push(`/courses/${courseId}/assignments`);
		});
	};

	const onDateChange = date => {
		setDueDate(date);
		if (!date || !isValid(date)) {
			setDateError(true);
		} else {
			setDateError(false);
		}
	};

	const onMonthChange = date => {
		setLoadingCount(true);
		sendRequest(
			fetchAssignmentCountByDate,
			{ courseId, date: format(date, 'MM-yyyy') },
			data => {
				setAssignmentsCount(data);
				setLoadingCount(false);
			},
		);
	};

	useEffect(() => {
		sendRequest(
			fetchAssignmentCountByDate,
			{ courseId, date: format(new Date(), 'MM-yyyy') },
			data => {
				setAssignmentsCount(data);
				setLoadingCount(false);
			},
		);
	}, [sendRequest, courseId]);

	return (
		<Container component="main" maxWidth="md">
			<LoadingSpinner isLoading={isLoading && !loadingCount} />
			<Box
				sx={{
					marginTop: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Controller
								name="title"
								control={control}
								rules={{
									required: 'Title is required',
								}}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										autoFocus
										required
										fullWidth
										type="text"
										label="Title"
										error={!!errors.title}
									/>
								)}
							/>
							{errors.title && (
								<Typography variant="caption" color="error">
									{errors.title.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="maxMarks"
								control={control}
								rules={{
									required: 'Maximum Marks is required',
								}}
								defaultValue={''}
								render={({ field }) => (
									<TextField
										{...field}
										required
										fullWidth
										type="number"
										min={0}
										label="Max Marks"
										error={!!errors.maxMarks}
									/>
								)}
							/>
							{errors.maxMarks && (
								<Typography variant="caption" color="error">
									{errors.maxMarks.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12}>
							<DateTimePicker
								date={dueDate}
								onChange={onDateChange}
								label="Due date"
								onMonthChange={onMonthChange}
								highlightDays={assignmentsCount}
								isLoading={isLoading}
								error={dateError}
							/>
							{dateError && (
								<Typography variant="caption" color="error">
									Please select a valid date
								</Typography>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextEditor
								state={editorState}
								onChange={setEditorState}
								title="Decription/Instructions"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={Object.keys(errors).length > 0 || dateError}
						endIcon={<Icon>send</Icon>}
					>
						Create
					</Button>
				</Box>
			</Box>
			<Box mb="50px" />
		</Container>
	);
};

export default NewForm;
