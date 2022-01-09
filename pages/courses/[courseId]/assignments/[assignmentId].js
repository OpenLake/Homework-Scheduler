import { useContext, useState } from 'react';
import CourseLayout, { useCourse } from '../../../../layouts/CourseLayout';
import { Assignment, Submission } from '../../../../models';

import authContext from '../../../../helpers/auth-context';

import { Container, Grid, Button, Box, Typography } from '@mui/material';

import AssignmentDetails from '../../../../components/Assignment/AssignmentDetails';
import Stats from '../../../../components/Assignment/Stats';
import NewSubmissionForm from '../../../../components/Forms/NewSubmission';

const Index = props => {
	const assignment = JSON.parse(props.assignment);
	const submissions = JSON.parse(props.submissions);
	const { user } = useContext(authContext);
	const { isEnrolled, isTeacher, courseId } = useCourse();

	const [isSubmitted, setIsSubmitted] = useState(
		submissions.find(submission => submission.submittedBy === user?._id),
	);

	return (
		<Container sx={{ p: 2 }}>
			<Grid container spacing={10}>
				<Grid item xs={12} md={6}>
					<AssignmentDetails assignment={assignment} />
				</Grid>
				{isTeacher && (
					<Grid item xs={12} md={6}>
						<Stats
							submissions={submissions.length}
							assignedTo={assignment.assignedTo.length}
						/>
						<Button variant="contained" color="warning" sx={{ mt: 2 }}>
							View Submissions
						</Button>
					</Grid>
				)}
				{!isTeacher && (
					<Grid item xs={12} md={6}>
						{isEnrolled && !isSubmitted && (
							<NewSubmissionForm
								assignmentId={assignment._id}
								courseId={courseId}
								onSubmit={() => setIsSubmitted(true)}
							/>
						)}
						{isSubmitted && (
							<Box>
								<Typography variant="h5">
									You have already submitted this assignment.
								</Typography>
								<Button variant="contained" color="primary" sx={{ mt: 2 }}>
									View Submission
								</Button>
							</Box>
						)}
						{!isEnrolled && (
							<Box>
								<Typography variant="h4">Not Enrolled !</Typography>
								<Typography variant="h6" fontWeight="300">
									Enroll in this course to submit this assignment by clicking
									the button above
								</Typography>
							</Box>
						)}
					</Grid>
				)}
			</Grid>
			<Box height="30px" />
		</Container>
	);
};

Index.Layout = CourseLayout;

export const getServerSideProps = async ctx => {
	const { courseId, assignmentId } = ctx.query;

	const assignment = await Assignment.findOne({
		_id: assignmentId,
		course: courseId,
	}).populate('createdBy');

	if (!assignment) {
		return {
			redirect: {
				status: 302,
				url: `/courses/${courseId}/assignments`,
			},
		};
	}

	const submissions = await Submission.find({
		assignment: assignmentId,
		course: courseId,
	});

	return {
		props: {
			assignment: JSON.stringify(assignment),
			submissions: JSON.stringify(submissions),
		},
	};
};

export default Index;
