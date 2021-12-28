import isAuth from '../../../middlewares/isAuth';
import webRoutes from '../../../helpers/webRoutes';
import Course from '../../../models/Course';

import Error from 'next/error';
import { Typography, Link as MUILink } from '@mui/material';

const Index = props => {
	if (props.error) {
		return <Error statusCode={props.statusCode} title={props.error} />;
	}

	const course = JSON.parse(props.course);

	return (
		<div>
			<Typography variant="h3" gutterBottom>
				{course.name} {course.code}
			</Typography>
			<Typography variant="body1" gutterBottom>
				<b>Invitation link: </b>
				<MUILink sx={{ cursor: 'pointer' }}>
					{`http://localhost:3000${webRoutes.course(course._id).path}?invite`}
				</MUILink>
			</Typography>
			<Typography variant="body1" gutterBottom>
				<b>Instructor</b>:{' '}
				{course.creator.firstName + ' ' + course.creator.lastName}
			</Typography>
			<Typography variant="body1" gutterBottom>
				{course.description}
			</Typography>
		</div>
	);
};

export const getServerSideProps = isAuth(async (ctx, user) => {
	const courseId = ctx.query.courseId;
	const course = await Course.findById(courseId).populate('creator');

	if (!course) {
		ctx.res.statusCode = 404;
		return {
			props: {
				error: 'Course not found',
				statusCode: 404,
			},
		};
	}

	if (
		course.creator._id.toString() === user._id.toString() ||
		user.courses.includes(course._id)
	) {
		return {
			props: {
				course: JSON.stringify(course),
			},
		};
	} else {
		ctx.res.statusCode = 403;
		return {
			props: {
				error: 'You are not authorized to view this course',
				statusCode: 403,
			},
		};
	}
}, webRoutes.course(''));

export default Index;
