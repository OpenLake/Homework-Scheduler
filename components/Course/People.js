import { useContext } from 'react';
import {
	Stack,
	Typography,
	List,
	ListItem,
	Divider,
	Avatar,
	Icon,
	Button,
} from '@mui/material';

import authContext from '../../helpers/auth-context';

const People = ({ teachers, students }) => {
	const { user } = useContext(authContext);

	const isTeacher = teachers.find(teacher => teacher._id === user._id);

	return (
		<Stack mt={5}>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Typography variant="h4">Teachers</Typography>
				{isTeacher && (
					<Button>
						<Icon>person_add</Icon>
					</Button>
				)}
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
				<Typography variant="h4">Students</Typography>
				{isTeacher && (
					<Button>
						<Icon>person_add</Icon>
					</Button>
				)}
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
					<ListItem>
						<Typography variant="body1" ml={1} textAlign="center">
							No students yet invite them to join the course
						</Typography>
					</ListItem>
				)}
			</List>
		</Stack>
	);
};

export default People;
