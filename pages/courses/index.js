import { dbConnect } from '../../lib/db';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import webRoutes from '../../helpers/webRoutes';
import { Course } from '../../models';

import CourseList from '../../components/Course/CourseList';
import NoCourses from '../../components/Course/NoCourse';
import { Box } from '@mui/material';

const Index = props => {
	const router = useRouter();
	const courses = JSON.parse(props.courses);

	if (courses.length === 0) {
		return (
			<NoCourses
				browseBtn={false}
				title="No Public Courses available"
				subTitle="Create a course to share it with the world."
			/>
		);
	}

	const onCourseClick = course => {
		router.push(webRoutes.course(course._id).path);
	};

	return (
		<Fragment>
			<CourseList
				title="Public Courses"
				courses={courses}
				onClick={onCourseClick}
			/>
		</Fragment>
	);
};

export const getServerSideProps = async ctx => {
	await dbConnect();

	const courses = await Course.find({
		type: 'public',
	}).populate('creator');

	return {
		props: {
			courses: JSON.stringify(courses),
		},
	};
};

export default Index;
