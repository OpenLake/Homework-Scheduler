import React from 'react';
import dynamic from 'next/dynamic';
import useHttp from '../../hooks/useHttp';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';

import { reqCreateAssignment } from '../../services/api/assignments';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Icon } from '@mui/material';
import LoadingSpinner from '../Utils/LoadingSpinner';

const TextEditor = dynamic(() => import('../Utils/TextEditor'), { ssr: false });

const NewForm = ({ courseId }) => {
	const router = useRouter();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const { isLoading, sendRequest } = useHttp();

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

		formData.description = html;
		formData.courseId = courseId;

		sendRequest(reqCreateAssignment, formData, () => {
			router.push(`/courses/${courseId}`);
		});
	};

	return (
		<Container component="main" maxWidth="md">
			<LoadingSpinner isLoading={isLoading} />
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
						<Grid item md={6} xs={12}>
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
						<Grid item md={6} xs={12}>
							<Controller
								name="dueDate"
								control={control}
								rules={{
									required: 'Due Date is Required',
								}}
								defaultValue="2022-01-01"
								render={({ field }) => (
									<TextField
										{...field}
										required
										fullWidth
										label="Due Date"
										type="date"
										error={!!errors.date}
									/>
								)}
							/>
							{errors.date && (
								<Typography variant="caption" color="error">
									{errors.date.message}
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
						disabled={Object.keys(errors).length > 0}
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
