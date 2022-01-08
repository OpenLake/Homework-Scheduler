import isAuth from '../../../middlewares/isAuth';
import webRoutes from '../../../helpers/webRoutes';
import Course from '../../../models/Course';
import User from '../../../models/User';

import Error from 'next/error';
import CourseComponent from '../../../components/Course/Course';

const Index = props => {
	if (props.error) {
		return <Error statusCode={props.statusCode} title={props.error} />;
	}

	const course = JSON.parse(props.course);

	return <CourseComponent course={course} />;
};

export const getServerSideProps = isAuth(async (ctx, user) => {
	const courseId = ctx.query.courseId;
	const course = await Course.findById(courseId).populate('creator', {
		_id: 1,
		firstName: 1,
		lastName: 1,
	});

	if (!course) {
		ctx.res.statusCode = 404;
		return {
			props: {
				error: 'Course not found',
				statusCode: 404,
			},
		};
	}

	const students = await User.find(
		{
			courses: { $in: [course._id] },
		},
		{ _id: 1, firstName: 1, lastName: 1 },
	);

	const courseJson = JSON.stringify({
		...course._doc,
		students,
	});

	return {
		props: {
			course: courseJson,
		},
	};
}, webRoutes.course(''));

export default Index;
