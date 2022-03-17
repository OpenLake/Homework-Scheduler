import CourseLayout from '../../../../layouts/CourseLayout';
import { useCourse } from '../../../../layouts/CourseLayout';
import Assignments from '../../../../components/Assignment/Assignments';

const Index = () => {
	const { courseId, isTeacher, isEnrolled } = useCourse();
	return (
		<Assignments
			courseId={courseId}
			isTeacher={isTeacher}
			isEnrolled={isEnrolled}
		/>
	);
};

Index.Layout = CourseLayout;

export default Index;
