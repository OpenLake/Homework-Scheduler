import { validateSlugs } from '../../../../helpers/validateSlugs';
import isAuth from '../../../../middlewares/isAuth';
import webRoutes from '../.../../../../../helpers/webRoutes';

import { Course } from '../../../../models';

import { Box, Divider, Stack, Typography } from '@mui/material';
import BackButton from '../../../../components/Utils/BackButton';
import NewAssignmentForm from '../../../../components/Forms/NewAssignment';

const New = props => {
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
	if (!validateSlugs(ctx)) {
		return {
			notFound: true,
		};
	}

	const courseId = ctx.query.courseId;
	const course = await Course.findById(courseId);

	if (!course) {
		return {
			notFound: true,
		};
	}

	if (!course.creator.equals(user._id)) {
		return {
			redirect: {
				destination: `/courses/${courseId}/assignments`,
			},
		};
	}

	return {
		props: {
			courseId,
		},
	};
}, webRoutes.newAssignment);

export default New;
