import { useRouter } from 'next/router';
import Link from 'next/link';
import { Course } from '../../models';
import webRoutes from '../../helpers/webRoutes';
import isAuth from '../../middlewares/isAuth';

import {
	Container,
	Link as MUILink,
	Icon,
	Typography,
	Stack,
} from '@mui/material';
import CourseList from '../../components/Course/CourseList';
import NoCourses from '../../components/Course/NoCourse';

const Dashboard = props => {
	const router = useRouter();
	const myCourses = JSON.parse(props.myCourses);
	const enrolledCourses = JSON.parse(props.enrolledCourses);

	const onClickCourse = course => {
		router.push(webRoutes.course(course._id).path);
	};

	return (
		<Container>
			<Stack
				direction="row"
				spacing={1}
				justifyContent="flex-end"
				alignItems="center"
				mt={2}
				mb={-5}
			>
				<Icon color="primary">list</Icon>
				<Link href="/dashboard/todo" passHref>
					<MUILink underline="hover">
						<Typography variant="h6">{"Your To-do's"}</Typography>
					</MUILink>
				</Link>
			</Stack>
			{myCourses.length > 0 && (
				<CourseList
					title="Your Courses"
					courses={myCourses}
					onClick={onClickCourse}
				/>
			)}
			{enrolledCourses.length > 0 && (
				<CourseList
					title="Enrolled Courses"
					courses={enrolledCourses}
					onClick={onClickCourse}
				/>
			)}
			{myCourses.length === 0 && enrolledCourses.length === 0 && <NoCourses />}
		</Container>
	);
};

export const getServerSideProps = isAuth(async (ctx, user) => {
	const myCourses = await Course.find({
		creator: user._id,
	}).populate('creator');

	const enrolledCourses = await Course.find({
		_id: { $in: user.courses },
	}).populate('creator');

	return {
		props: {
			user: JSON.stringify(user),
			myCourses: JSON.stringify(myCourses),
			enrolledCourses: JSON.stringify(enrolledCourses),
		},
	};
}, webRoutes.dashboard);

export default Dashboard;
