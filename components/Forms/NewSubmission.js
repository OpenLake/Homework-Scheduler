import { useContext, useState } from 'react';
import useHttp from '../../hooks/useHttp';
import { useRouter } from 'next/router';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import dynamic from 'next/dynamic';
import authContext from '../../helpers/auth-context';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingSpinner from '../Utils/LoadingSpinner';

import { reqCreateSubmission } from '../../services/api/submissions';

const TextEditor = dynamic(() => import('../Utils/TextEditor'), {
	ssr: false,
});

const SubmissionForm = props => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const { isAuthenticated } = useContext(authContext);
	const router = useRouter();
	const { isLoading, sendRequest } = useHttp();

	const onSubmit = e => {
		e.preventDefault();
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
				assignmentId: props.assignmentId,
				courseId: props.courseId,
			},
			() => props.onSubmit(),
		);
	};

	return (
		<Box>
			<LoadingSpinner isLoading={isLoading} />
			<Typography component="h1" variant="h5">
				Submit Your Work
			</Typography>
			<Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
				<TextEditor state={editorState} onChange={setEditorState} />
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Submit
				</Button>
			</Box>
		</Box>
	);
};

export default SubmissionForm;
