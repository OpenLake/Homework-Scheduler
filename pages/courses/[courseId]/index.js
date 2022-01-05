import { useEffect } from 'react';
import { useRouter } from 'next/router';
import CourseLayout from '../../../layouts/CourseLayout';

const Index = () => {
	const router = useRouter();

	useEffect(() => {
		router.push(`/courses/${router.query.courseId}/assignments`);
	}, [router]);

	return <div></div>;
};

Index.Layout = CourseLayout;

export default Index;
