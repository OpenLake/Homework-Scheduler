import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useHttp from '../../hooks/useHttp';
import webRoutes from '../../helpers/webRoutes';
import { reqJoinCourse } from '../../services/api/courses';
import Course from '../../models/Course';

import CourseList from '../../components/Course/CourseList';
import NoCourses from '../../components/Course/NoCourse';
import ConfirmationDialog from '../../components/Utils/ConfirmationDialog';
import ErrorDialog from '../../components/Utils/ErrorDialog';
import LoadingSpinner from '../../components/Utils/LoadingSpinner';

const Index = props => {
	const router = useRouter();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [course, setCourse] = useState(null);
	const { sendRequest, error, isLoading, clearError } = useHttp();
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

	const handleClose = () => {
		setDialogOpen(false);
		setCourse(null);
	};

	const onCourseClick = course => {
		setCourse(course);
		setDialogOpen(true);
	};

	const handleConfirm = () => {
		sendRequest(reqJoinCourse, course._id, () => {
			router.push(webRoutes.course(course._id).path);
		});
	};

	return (
		<Fragment>
			<LoadingSpinner isLoading={isLoading} />
			<ConfirmationDialog
				open={dialogOpen && !error}
				title="Are you sure you want to enroll in this course?"
				content={`You will be enrolled in ${course?.name} ${course?.code}`}
				handleClose={handleClose}
				handleConfirm={handleConfirm}
			/>
			<ErrorDialog
				open={!!error}
				handleClose={() => {
					clearError();
					handleClose();
				}}
				title="Error"
				content={error}
			/>
			<CourseList title="Courses" courses={courses} onClick={onCourseClick} />
		</Fragment>
	);
};

export const getServerSideProps = async ctx => {
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
