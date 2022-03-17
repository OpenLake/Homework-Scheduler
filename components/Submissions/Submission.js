import { useState } from 'react';
import { Divider, Typography, Box } from '@mui/material';
import { format } from 'date-fns';
import GradeForm from '../Forms/GradeForm';

const SubmissionDetails = ({ submission, assignment }) => {
	const { student } = submission;
	const isMissing = submission.isMissing;
	const isLate =
		!isMissing && new Date(assignment.dueDate) < new Date(submission.createdAt);

	const [marks, setMarks] = useState(false);
	const [feedback, setFeedback] = useState(false);

	const handleGrade = formData => {
		if (formData.marks) {
			setMarks(formData.marks);
		}
		setFeedback(formData.feedback);
	};

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
					<Typography variant="h4">Marks and Feedback</Typography>
					<Divider />
					{(submission.status === 'graded' || marks) && (
						<Box mt={2}>
							<Box>
								<Typography variant="h6">Given Marks</Typography>
								<Typography variant="body1">
									{submission.marks || marks} / {assignment.maxMarks}
								</Typography>
							</Box>
							{(submission.feedback || feedback) && (
								<Box>
									<Typography variant="h6">Given Feedback</Typography>
									<Typography variant="body1">
										{submission.feedback || feedback}
									</Typography>
								</Box>
							)}
							{!submission.feedback && !feedback && (
								<GradeForm
									maxMarks={assignment.maxMarks}
									submissionId={submission._id}
									onlyFeedback
									handleGrade={handleGrade}
								/>
							)}
						</Box>
					)}
					{submission.status !== 'graded' && !marks && (
						<GradeForm
							maxMarks={assignment.maxMarks}
							submissionId={submission._id}
							handleGrade={handleGrade}
						/>
					)}
				</>
			)}
		</Box>
	);
};

export default SubmissionDetails;
