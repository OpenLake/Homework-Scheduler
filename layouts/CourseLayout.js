import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import useHttp from '../hooks/useHttp';
import {
	getCourseById,
	reqJoinCourse,
	reqLeaveCourse,
} from '../services/api/courses';

import {
	Tabs,
	Tab,
	Icon,
	Stack,
	Typography,
	Button,
	Box,
	Divider,
} from '@mui/material';
import LoadingSpinner from '../components/Utils/LoadingSpinner';
import BackButton from '../components/Utils/BackButton';
import ConfirmationDialog from '../components/Utils/ConfirmationDialog';
import Invite from '../components/Course/Invite';

const EnrolledButton = props => {
	const router = useRouter();
	const { isLoading, sendRequest } = useHttp();
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		if (props.isEnrolled === 'unauthenticated') {
			router.push('/login');
			return;
		}
		setOpen(true);
	};

	const handleConfirm = () => {
		setOpen(false);
		if (props.isEnrolled) {
			sendRequest(reqLeaveCourse, props.courseId, () => {
				router.reload();
			});
		} else {
			sendRequest(reqJoinCourse, props.courseId, () => {
				router.reload();
			});
		}
	};

	return (
		<Box mr={1}>
			<Button
				onClick={handleClick}
				endIcon={
					<Icon>
						{props.isEnrolled && props.isEnrolled !== 'unauthenticated'
							? 'check'
							: 'add'}
					</Icon>
				}
			>
				{props.isEnrolled && props.isEnrolled !== 'unauthenticated'
					? 'Enrolled'
					: 'Enroll'}
			</Button>
			<LoadingSpinner isLoading={isLoading} />
			<ConfirmationDialog
				open={open}
				handleClose={() => setOpen(false)}
				handleConfirm={handleConfirm}
				title={props.isEnrolled ? 'Leave Course' : 'Join Course'}
				content={
					props.isEnrolled
						? 'Are you sure you want to leave this course?'
						: 'Are you sure you want to join this course?'
				}
			/>
		</Box>
	);
};

const InviteButton = ({ courseId }) => {
	const [open, setOpen] = useState(false);

	return (
		<Box mr={1}>
			<Button onClick={() => setOpen(true)}>
				Invite <Icon>add</Icon>
			</Button>
			<Invite open={open} close={() => setOpen(false)} courseId={courseId} />
		</Box>
	);
};

const CourseContext = createContext();

export const useCourse = () => {
	const ctx = useContext(CourseContext);
	if (ctx === undefined) {
		throw new Error('useCourse must be used within a CourseLayout');
	}
	return ctx;
};

const CourseLayout = ({ children }) => {
	const router = useRouter();
	const { courseId } = router.query;
	const [course, setCourse] = useState(null);
	const [value, setValue] = useState(0);
	const [isTeacher, setIsTeacher] = useState(false);
	const [isEnrolled, setIsEnrolled] = useState(false);
	const { isLoading, sendRequest } = useHttp();

	useEffect(() => {
		if (!courseId) {
			return;
		}
		sendRequest(getCourseById, courseId, data => {
			setCourse(data.course);
			setIsTeacher(data.isTeacher);
			setIsEnrolled(data.isEnrolled);
		});
	}, [sendRequest, courseId]);

	const handleChange = (_, tab) => {
		setValue(tab);

		switch (tab) {
			case 0:
				router.push(`/courses/${courseId}/assignments`);
				break;
			case 1:
				router.push(`/courses/${courseId}/members`);
				break;
			case 2:
				router.push(`/courses/${courseId}/announcements`);
				break;
		}
	};

	return (
		<CourseContext.Provider
			value={{
				courseId,
				isEnrolled,
				isTeacher,
				course,
			}}
		>
			<Box sx={{ width: '100%' }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<BackButton />
					<Tabs value={value} onChange={handleChange}>
						<Tab label="Assignments" icon={<Icon>assignment</Icon>} />
						<Tab label="Members" icon={<Icon>group</Icon>} />
						<Tab label="Announcements" icon={<Icon>announcement</Icon>} />
					</Tabs>
					{!isTeacher && (
						<EnrolledButton courseId={course?._id} isEnrolled={isEnrolled} />
					)}
					{isTeacher && <InviteButton courseId={course?._id} />}
				</Stack>
				<Divider />
				<LoadingSpinner isLoading={isLoading} />
				{!isLoading && (
					<Stack mt={2}>
						<Typography variant="h5" textAlign="center">
							{course?.name}
						</Typography>
						<Typography variant="subtitle1" color="GrayText" textAlign="center">
							{course?.code}
						</Typography>
					</Stack>
				)}
				{children}
				<Box height="20px" />
			</Box>
		</CourseContext.Provider>
	);
};

export default CourseLayout;
