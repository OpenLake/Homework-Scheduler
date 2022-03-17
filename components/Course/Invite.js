import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
	Button,
	Icon,
	Tooltip,
} from '@mui/material';

const Invite = props => {
	const [copied, setCopied] = useState(false);
	const url = `https://localhost:3000/courses/${props.courseId}`;

	const onCopy = () => {
		navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Dialog open={props.open} onClose={props.close}>
			<DialogTitle>Invite</DialogTitle>
			<DialogContent dividers>
				<Typography variant="subtitle1">
					Share this link with people you want to invite to join this course.
				</Typography>
				<Typography variant="body1" color="primary" noWrap>
					{`https://localhost:3000/courses/${props.courseId}`}
				</Typography>
				<Tooltip open={copied} title="Copied" arrow placement="top">
					<Button
						color="success"
						variant="contained"
						sx={{ mt: 2 }}
						endIcon={<Icon>content_copy</Icon>}
						onClick={onCopy}
					>
						Copy
					</Button>
				</Tooltip>
			</DialogContent>
		</Dialog>
	);
};

export default Invite;
