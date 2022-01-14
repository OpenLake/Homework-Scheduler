import { useState } from 'react';
import { validateSlugs } from '../../../../../helpers/validateSlugs';
import { Submission, Assignment, User } from '../../../../../models';
import CourseLayout from '../../../../../layouts/CourseLayout';
import isAuth from '../../../../../middlewares/isAuth';
import webRoutes from '../../../../../helpers/webRoutes';

import { useMediaQuery, Grid, IconButton, Icon, Box } from '@mui/material';
import AssignmentDetails from '../../../../../components/Assignment/AssignmentDetails';
import StudentsSideBar from '../../../../../components/Submissions/StudentsSideBar';
import SubmissionDetails from '../../../../../components/Submissions/Submission';

const Submissions = props => {
	const mobile = useMediaQuery('(max-width: 900px)');
	const [open, setOpen] = useState(!mobile);
	const assignment = JSON.parse(props.assignment);
	const submissions = JSON.parse(props.submissions);
	const students = JSON.parse(props.students);
	const [activeSubmission, setActiveSubmission] = useState('instructions');

	const handleClick = id => {
		if (id === 'backdrop') {
			setOpen(false);
			return;
		}

		if (id === 'instructions') {
			setActiveSubmission('instructions');
			setOpen(false);
			return;
		}

		const submission = submissions.find(
			submission => submission.submittedBy.toString() === id.toString(),
		);

		const student = students.find(st => st._id.toString() === id.toString());

		setActiveSubmission({ ...submission, student, isMissing: !submission });
		setOpen(false);
	};

	return (
		<Box>
			<Grid container sx={{ mt: 2 }}>
				<Grid item xs={12} md={3}>
					{mobile && (
						<IconButton onClick={() => setOpen(!open)}>
							<Icon>{open ? 'close' : 'menu'}</Icon>
						</IconButton>
					)}
					<StudentsSideBar
						students={students}
						open={open}
						mobile={mobile}
						handleClick={handleClick}
						submissions={submissions}
						activeId={activeSubmission}
					/>
				</Grid>
				<Grid item xs={12} md={9} p={2}>
					{activeSubmission === 'instructions' && (
						<AssignmentDetails assignment={assignment} />
					)}
					{activeSubmission !== 'instructions' && (
						<SubmissionDetails
							submission={activeSubmission}
							assignment={assignment}
						/>
					)}
				</Grid>
			</Grid>
			<Box height="60px" />
		</Box>
	);
};

Submissions.Layout = CourseLayout;

export const getServerSideProps = isAuth(async (ctx, user) => {
	if (!validateSlugs(ctx)) {
		return {
			notFound: true,
		};
	}

	const { courseId, assignmentId } = ctx.query;

	const assignment = await Assignment.findOne({
		_id: assignmentId,
		course: courseId,
	});

	if (!assignment) {
		return {
			notFound: true,
		};
	}

	const isTeacher = user._id.toString() === assignment.createdBy.toString();

	if (!isTeacher) {
		return {
			redirect: {
				destination: `/courses/${courseId}/assignments/${assignmentId}`,
				permanent: false,
			},
		};
	}

	const [submissions, students] = await Promise.all([
		Submission.find({
			assignment: assignmentId,
		}),
		User.find({ courses: { $in: [courseId] } }),
	]);

	return {
		props: {
			submissions: JSON.stringify(submissions),
			assignment: JSON.stringify(assignment),
			students: JSON.stringify(students),
		},
	};
}, webRoutes.submissions);

export default Submissions;
