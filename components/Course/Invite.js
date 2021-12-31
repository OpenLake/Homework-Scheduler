import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

const Invite = props => {
	return (
		<Dialog open={props.open} onClose={props.close}>
			<DialogTitle>Invite</DialogTitle>
			<DialogContent dividers>
				<Typography variant="subtitle1">
					Share this link with people you want to invite to join this course.
				</Typography>
				<Typography variant="body1" color="primary">
					{`https://localhost:3000/courses/${props.courseId}`}
				</Typography>
			</DialogContent>
		</Dialog>
	);
};

export default Invite;
