import CourseLayout, { useCourse } from '../../../../layouts/CourseLayout';
import Assignment from '../../../../models/Assignment';
import { Typography, Box } from '@mui/material';

const Index = props => {
	const assignment = JSON.parse(props.assignment);
	const { isEnrolled, isTeacher } = useCourse();

	return (
		<Box component="main" p={2}>
			<Typography variant="h4" textAlign="center" mb={2}>
				{assignment.title}
			</Typography>
			<Typography variant="h5" textAlign="left" fontWeight={2}>
				Assignment Description/Instructions
			</Typography>
			<div dangerouslySetInnerHTML={{ __html: assignment.description }} />
		</Box>
	);
};

Index.Layout = CourseLayout;

export const getServerSideProps = async ctx => {
	const { courseId, assignmentId } = ctx.query;

	const assignment = await Assignment.findOne({
		_id: assignmentId,
		course: courseId,
	});

	if (!assignment) {
		return {
			redirect: {
				status: 302,
				url: `/courses/${courseId}/assignments`,
			},
		};
	}

	return {
		props: {
			assignment: JSON.stringify(assignment),
		},
	};
};

export default Index;
