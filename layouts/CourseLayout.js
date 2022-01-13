import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import useHttp from '../hooks/useHttp';
import {
	getCourseById,
	reqJoinCourse,
	reqLeaveCourse,
} from '../services/api/courses';

import { isValidID } from '../helpers/validateSlugs';

import {
	Tabs,
	Tab,
	Icon,
	Stack,
	Typography,
	Button,
	Box,
	Divider,
	useMediaQuery,
} from '@mui/material';
import LoadingSpinner from '../components/Utils/LoadingSpinner';
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
				props.onEnrollOrUnenroll();
			});
		} else {
			sendRequest(reqJoinCourse, props.courseId, () => {
				props.onEnrollOrUnenroll();
			});
		}
	};

	return (
		<Box>
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
		<Box>
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
	const mq = useMediaQuery('(max-width:800px)');
	const router = useRouter();
	const { courseId } = router.query;
	const [slugError, setSlugError] = useState(false);
	const [course, setCourse] = useState(null);
	const [value, setValue] = useState(0);
	const [isTeacher, setIsTeacher] = useState(false);
	const [isEnrolled, setIsEnrolled] = useState(false);
	const { isLoading, sendRequest, error } = useHttp();

	useEffect(() => {
		if (!courseId) {
			return;
		}

		if (!isValidID(courseId)) {
			setSlugError(true);
		}

		sendRequest(getCourseById, courseId, data => {
			setCourse(data.course);
			setIsTeacher(data.isTeacher);
			setIsEnrolled(data.isEnrolled);
		});
	}, [sendRequest, courseId]);

	const onEnrollOrUnenroll = () => {
		sendRequest(getCourseById, courseId, data => {
			setCourse(data.course);
			setIsTeacher(data.isTeacher);
			setIsEnrolled(data.isEnrolled);
		});
	};

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

	if (slugError || error) {
		return <ErrorPage statusCode="404" title="Course not found" />;
	}

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
					paddingX={2}
					mb={1}
				>
					{!isLoading && (
						<Stack mt={1}>
							<Typography variant="h4" textAlign="left">
								{course?.name}
							</Typography>
							<Typography variant="subtitle1" color="GrayText" textAlign="left">
								{course?.code}
							</Typography>
						</Stack>
					)}
					{!mq && (
						<Tabs value={value} onChange={handleChange}>
							<Tab icon={<Icon>assignment</Icon>} label="assignment" />
							<Tab icon={<Icon>group</Icon>} label="members" />
							<Tab icon={<Icon>announcement</Icon>} label="announcements" />
						</Tabs>
					)}
					{!isTeacher && (
						<EnrolledButton
							courseId={course?._id}
							isEnrolled={isEnrolled}
							onEnrollOrUnenroll={onEnrollOrUnenroll}
						/>
					)}
					{isTeacher && <InviteButton courseId={course?._id} />}
				</Stack>
				<Divider />
				{mq && (
					<Tabs value={value} onChange={handleChange} variant="fullWidth">
						<Tab icon={<Icon>assignment</Icon>} label="assignment" />
						<Tab icon={<Icon>group</Icon>} label="members" />
						<Tab icon={<Icon>announcement</Icon>} label="announcements" />
					</Tabs>
				)}
				<LoadingSpinner isLoading={isLoading} />
				{children}
				<Box height="20px" />
			</Box>
		</CourseContext.Provider>
	);
};

export default CourseLayout;
