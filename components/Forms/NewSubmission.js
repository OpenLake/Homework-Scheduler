import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useHttp from '../../hooks/useHttp';
import { useRouter } from 'next/router';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import dynamic from 'next/dynamic';
import authContext from '../../helpers/auth-context';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingSpinner from '../Utils/LoadingSpinner';

import { reqCreateSubmission } from '../../services/api/submissions';

const TextEditor = dynamic(() => import('../Utils/TextEditor'), {
	ssr: false,
});

const SubmissionForm = props => {
	const router = useRouter();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const { isAuthenticated } = useContext(authContext);
	const { isLoading, sendRequest } = useHttp();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = formData => {
		if (!isAuthenticated) {
			router.push('/login');
			return;
		}
		const html = stateToHTML(editorState.getCurrentContent());

		if (html === '<p><br></p>' || html === '<p></p>') {
			alert('Please enter your work');
			return;
		}

		sendRequest(
			reqCreateSubmission,
			{
				content: html,
				timeTaken: formData.timeTaken,
				assignmentId: props.assignmentId,
				courseId: props.courseId,
			},
			() => props.onSubmit(html),
		);
	};

	return (
		<Box>
			<LoadingSpinner isLoading={isLoading} />
			<Box
				component="form"
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				sx={{ mt: 3 }}
			>
				<TextEditor state={editorState} onChange={setEditorState} />
				<Box mt={2}>
					<Controller
						name="timeTaken"
						control={control}
						rules={{ min: { value: 0, message: 'Please enter a valid time' } }}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								label="Time Taken (in hours)"
								type="number"
								error={!!errors.timeTaken}
								helperText={errors.timeTaken?.message}
							/>
						)}
					/>
				</Box>
				<Button type="submit" variant="contained" sx={{ mt: 2, px: 10 }}>
					Submit
				</Button>
			</Box>
		</Box>
	);
};

export default SubmissionForm;
