import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import useHttp from '../../hooks/useHttp';

import { reqJoinCourse, reqLeaveCourse } from '../../services/api/courses';

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

import AuthContext from '../../helpers/auth-context';
import Assignments from '../Assignment/Assignments';
import People from './People';
import LoadingSpinner from '../Utils/LoadingSpinner';
import Invite from './Invite';
import ConfirmationDialog from '../Utils/ConfirmationDialog';
import BackButton from '../Utils/BackButton';

const EnrolledButton = props => {
	const { isAuthenticated } = useContext(AuthContext);
	const router = useRouter();
	const { isLoading, sendRequest } = useHttp();
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		if (!isAuthenticated) {
			router.push('/login');
			return;
		}
		setOpen(true);
	};

	const handleConfirm = () => {
		setOpen(false);
		if (props.enrolled) {
			sendRequest(reqLeaveCourse, props.courseId, () => {
				props.onStudentLeave();
			});
		} else {
			sendRequest(reqJoinCourse, props.courseId, () => {
				props.onStudentAdd();
			});
		}
	};

	return (
		<Box mr={1}>
			<Button
				onClick={handleClick}
				endIcon={<Icon>{props.enrolled ? 'check' : 'add'}</Icon>}
			>
				{props.enrolled ? 'Enrolled' : 'Enroll'}
			</Button>
			<LoadingSpinner isLoading={isLoading} />
			<ConfirmationDialog
				open={open}
				handleClose={() => setOpen(false)}
				handleConfirm={handleConfirm}
				title={props.enrolled ? 'Leave Course' : 'Join Course'}
				content={
					props.enrolled
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

const Course = ({ course }) => {
	const { user } = useContext(AuthContext);
	const [activeTab, setActiveTab] = useState(0);
	const [students, setStudents] = useState(course.students);
	const [enrolled, setEnrolled] = useState(false);

	useEffect(() => {
		setEnrolled(!!students.find(s => s._id === user?._id));
	}, [user, students]);

	const handleChange = (_, newValue) => {
		setActiveTab(newValue);
	};

	const onStudentAdd = () => {
		setStudents([
			...students,
			{
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		]);
	};

	const onStudentLeave = () => {
		setStudents(students.filter(s => s._id !== user._id));
	};

	const teacher = course.creator._id === user?._id;

	return (
		<Box sx={{ width: '100%' }}>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<BackButton />
				<Tabs value={activeTab} onChange={handleChange}>
					<Tab label="Assignments" icon={<Icon>assignment</Icon>} />
					<Tab label="People" icon={<Icon>people</Icon>} />
					<Tab label="Announcements" icon={<Icon>announcement</Icon>} />
				</Tabs>
				{!teacher && (
					<EnrolledButton
						courseId={course._id}
						enrolled={enrolled}
						onStudentAdd={onStudentAdd}
						onStudentLeave={onStudentLeave}
					/>
				)}
				{teacher && <InviteButton courseId={course._id} />}
			</Stack>
			<Divider />
			<Stack mt={2}>
				<Typography variant="h5" textAlign="center">
					{course.name}
				</Typography>
				<Typography variant="subtitle1" color="GrayText" textAlign="center">
					{course.code}
				</Typography>
			</Stack>
			{activeTab === 0 && (
				<Assignments courseId={course._id} isTeacher={teacher} />
			)}
			{activeTab === 1 && (
				<People
					students={students}
					teachers={[course.creator]}
					courseId={course._id}
				/>
			)}
			<Box height="20px" />
		</Box>
	);
};

export default Course;
