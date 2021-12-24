import CourseList from '../../components/Course/CourseList';
import NoCourses from '../../components/Course/NoCourse';
import Course from '../../models/Course';

const Index = props => {
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

	return <CourseList title="Courses" courses={courses} />;
};

export const getServerSideProps = async ctx => {
	const courses = await Course.find({
		type: 'public',
	});

	return {
		props: {
			courses: JSON.stringify(courses),
		},
	};
};

export default Index;
