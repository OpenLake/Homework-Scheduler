import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Fragment } from 'react';
import { Typography } from '@mui/material';

const wrapperStyle = {
	border: '1px solid #ccc',
};

const editorStyle = {
	height: '10rem',
	padding: '0 1rem',
};

const TextEditor = ({ onChange, state, title }) => {
	const onEditorStateChange = editorState => {
		onChange(editorState);
	};

	return (
		<Fragment>
			<Typography variant="body1" fontWeight="bold">
				{title}
			</Typography>
			<Editor
				editorState={state}
				wrapperStyle={wrapperStyle}
				editorStyle={editorStyle}
				toolbar={{
					options: ['inline', 'blockType', 'list', 'link', 'image', 'emoji'],
				}}
				onEditorStateChange={onEditorStateChange}
			/>
		</Fragment>
	);
};

export default TextEditor;
