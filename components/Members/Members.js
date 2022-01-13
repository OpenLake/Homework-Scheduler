import { useState, useEffect } from 'react';
import { getCourseMembers } from '../../services/api/courses';
import useHttp from '../../hooks/useHttp';

import {
	Stack,
	Typography,
	List,
	ListItem,
	Divider,
	Avatar,
	Chip,
} from '@mui/material';
import LoadingSpinner from '../Utils/LoadingSpinner';

const People = ({ courseId, isTeacher }) => {
	const [students, setStudents] = useState([]);
	const [teachers, setTeachers] = useState([]);
	const { isLoading, sendRequest } = useHttp();

	useEffect(() => {
		if (!courseId) {
			return;
		}
		sendRequest(getCourseMembers, courseId, data => {
			setStudents(data.students);
			setTeachers(data.teachers);
		});
	}, [sendRequest, courseId]);

	if (isLoading) {
		return <LoadingSpinner isLoading={isLoading} />;
	}

	return (
		<Stack mt={2} px={5}>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Typography variant="h6" fontWeight={2}>
					TEACHERS
				</Typography>
				<Chip label={teachers.length} color="primary" size="small" />
			</Stack>
			<Divider />
			<List>
				{teachers.map(teacher => (
					<ListItem key={teacher._id}>
						<Avatar src="#" alt={teacher.firstName} />
						<Typography variant="body1" ml={1}>
							{teacher.firstName} {teacher.lastName}
						</Typography>
					</ListItem>
				))}
			</List>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				mt={3}
			>
				<Typography variant="h6" fontWeight={2}>
					STUDENTS
				</Typography>
				<Chip label={students.length} color="primary" size="small" />
			</Stack>
			<Divider />
			<List>
				{students.map(student => (
					<ListItem key={student._id} sx={{ mb: 1 }}>
						<Avatar src="#" alt={student.firstName} />
						<Typography variant="body1" ml={1}>
							{student.firstName} {student.lastName}
						</Typography>
					</ListItem>
				))}
				{students.length === 0 && (
					<Typography variant="h5" mt={2} textAlign="center">
						{isTeacher
							? 'No students yet invite them to your course'
							: 'No Students Enrolled Yet'}
					</Typography>
				)}
			</List>
		</Stack>
	);
};

export default People;
