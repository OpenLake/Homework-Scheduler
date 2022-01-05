import { useCourse } from '../../../../layouts/CourseLayout';

import CourseLayout from '../../../../layouts/CourseLayout';
import Members from '../../../../components/Members/Members';

const Index = () => {
	const { courseId, isTeacher } = useCourse();

	return <Members courseId={courseId} isTeacher={isTeacher} />;
};

Index.Layout = CourseLayout;

export default Index;
