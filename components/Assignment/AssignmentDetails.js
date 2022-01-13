import { Divider, Typography, Box } from '@mui/material';
import { format } from 'date-fns';

const Assignment = ({ assignment }) => {
	return (
		<Box>
			<Typography variant="h4">{assignment.title}</Typography>
			<Typography variant="body2" color="textSecondary">
				<i>
					Assigned by - {assignment.createdBy.firstName}{' '}
					{assignment.createdBy.lastName}
				</i>
			</Typography>
			<Typography variant="body2" color="textSecondary">
				<i>
					Due Date -{' '}
					{format(new Date(assignment.dueDate), "MMMM dd, yyyy 'at' h:mm a")}
				</i>
			</Typography>
			<Typography variant="body2" color="textSecondary">
				<i>Max Marks - {assignment.maxMarks}</i>
			</Typography>
			<Typography variant="h4" fontWeight={2} mt={1}>
				Instructions
			</Typography>
			<Divider />
			<div dangerouslySetInnerHTML={{ __html: assignment.description }} />
		</Box>
	);
};

export default Assignment;
