import isAuth from '../../../../middlewares/isAuth';
import webRoutes from '../.../../../../../helpers/webRoutes';

import Course from '../../../../models/Course';

import { Box, Divider, Stack, Typography } from '@mui/material';
import Error from 'next/error';
import BackButton from '../../../../components/Utils/BackButton';
import NewAssignmentForm from '../../../../components/Forms/NewAssignment';

const New = props => {
	if (props.error) {
		return <Error statusCode={props.statusCode} title={props.error} />;
	}

	return (
		<Box mt={2}>
			<Stack direction="row">
				<BackButton />
				<Typography variant="h4" mx="auto">
					New Assignment
				</Typography>
			</Stack>
			<Divider />
			<NewAssignmentForm courseId={props.courseId} />
		</Box>
	);
};

export const getServerSideProps = isAuth(async (ctx, user) => {
	const courseId = ctx.query.courseId;
	const course = await Course.findById(courseId);

	if (!course) {
		return { props: { statusCode: 404, error: 'Course not found' } };
	}

	if (!course.creator.equals(user._id)) {
		return { props: { statusCode: 403, error: 'Unauthorized' } };
	}

	return {
		props: {
			courseId,
		},
	};
}, webRoutes.newAssignment(''));

export default New;
