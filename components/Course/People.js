import { useContext, useState } from 'react';
import {
	Stack,
	Typography,
	List,
	ListItem,
	Divider,
	Avatar,
} from '@mui/material';

import authContext from '../../helpers/auth-context';

const People = ({ teachers, students, courseId }) => {
	const { user } = useContext(authContext);

	const isTeacher = teachers.find(teacher => teacher._id === user._id);

	return (
		<Stack mt={2}>
			<Stack direction="row" alignItems="center" justifyContent="spac-between">
				<Typography variant="h6" fontWeight={2}>
					TEACHERS
				</Typography>
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
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Typography variant="h6" fontWeight={2}>
					STUDENTS
				</Typography>
			</Stack>
			<Divider />
			<List>
				{students.map(student => (
					<ListItem key={student._id}>
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
