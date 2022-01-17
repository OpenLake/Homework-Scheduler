import useAssignments from '../../hooks/useAssignments';

import Link from 'next/link';
import { Typography, Box, Button, Icon } from '@mui/material';

import AssignmentTable from './AssignmentTable';
import LoadingSpinner from '../Utils/LoadingSpinner';

const Assignments = ({ isTeacher, courseId, isEnrolled }) => {
	const { assignments, isLoading } = useAssignments(courseId);

	return (
		<Box px={3} mt={2}>
			<LoadingSpinner isLoading={isLoading} />
			{!isLoading && assignments.length === 0 && (
				<Box textAlign="center" mt={10}>
					<Typography variant="h4">
						No assignments {isTeacher ? 'created' : 'assigned at the moment'}
					</Typography>
					{isTeacher && (
						<Box>
							<Typography variant="body2" mb={2}>
								Click the button below to create a new assignment
							</Typography>
							<Link passHref href={`/courses/${courseId}/assignments/new`}>
								<Button variant="contained" color="warning">
									Create <Icon>add</Icon>
								</Button>
							</Link>
						</Box>
					)}
				</Box>
			)}
			{!isLoading && assignments.length !== 0 && (
				<Box>
					{isTeacher && (
						<Link passHref href={`/courses/${courseId}/assignments/new`}>
							<Button variant="contained" color="warning">
								Create <Icon>add</Icon>
							</Button>
						</Link>
					)}
					<AssignmentTable
						assignments={assignments}
						isTeacher={isTeacher}
						isEnrolled={isEnrolled}
						courseId={courseId}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Assignments;
