import CourseLayout from '../../../../layouts/CourseLayout';
import { useCourse } from '../../../../layouts/CourseLayout';
import Assignments from '../../../../components/Assignment/Assignments';

const Index = () => {
	const { courseId, isTeacher } = useCourse();
	return <Assignments courseId={courseId} isTeacher={isTeacher} />;
};

Index.Layout = CourseLayout;

export default Index;
