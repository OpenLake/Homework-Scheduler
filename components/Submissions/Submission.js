import { Divider, Typography, Box } from '@mui/material';
import { format } from 'date-fns';
import GradeForm from '../Forms/GradeForm';

const SubmissionDetails = ({ submission, dueDate }) => {
	const { student } = submission;
	const isMissing = submission.isMissing;
	const isLate =
		!isMissing && new Date(dueDate) < new Date(submission.createdAt);

	return (
		<Box>
			<Typography variant="h4">{`${student.firstName} ${student.lastName}'s Work`}</Typography>
			{isMissing && (
				<Typography variant="h5" color="error" mt={3}>
					Missing
				</Typography>
			)}
			{isLate && (
				<Typography variant="body1" color="error">
					Submitted Late
				</Typography>
			)}
			{!isMissing && (
				<>
					<Typography variant="body2" color="textSecondary">
						<i>
							Submitted On -{' '}
							{format(
								new Date(submission.createdAt),
								"MMMM dd, yyyy 'at' h:mm a",
							)}
						</i>
					</Typography>
					<Divider />
					<div dangerouslySetInnerHTML={{ __html: submission.content }} />
					<Typography variant="h4">Mark and Feedback</Typography>
					<Divider />
					<GradeForm />
				</>
			)}
		</Box>
	);
};

export default SubmissionDetails;
