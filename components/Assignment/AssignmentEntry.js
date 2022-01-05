import {
	TableRow,
	Tooltip,
	Typography,
	TableCell,
	Icon,
	Avatar,
} from '@mui/material';
import { red, green } from '@mui/material/colors';

const formatDate = date => {
	const d = new Date(date);
	return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const calculateDaysLeft = dueDate => {
	const d = new Date(dueDate);
	const now = new Date();
	const diff = d.getTime() - now.getTime();
	const daysLeft = Math.ceil(diff / (1000 * 3600 * 24));
	if (daysLeft < 0) {
		return 'Missed';
	} else if (daysLeft === 0) {
		return 'Due Today';
	} else if (daysLeft === 1) {
		return 'Due Tomorrow';
	}
	return `Due in ${daysLeft} days`;
};

const AssignmentEntry = props => {
	const { assignment } = props;

	return (
		<TableRow>
			<TableCell align="left" padding="normal">
				<Tooltip title="Title">
					<Typography variant="body2" component="span" noWrap>
						{assignment.title}
					</Typography>
				</Tooltip>
			</TableCell>
			<TableCell align="left" padding="normal">
				<Tooltip title={calculateDaysLeft(assignment.dueDate)} arrow>
					<Typography variant="body2" component="span">
						{formatDate(assignment.dueDate)}
					</Typography>
				</Tooltip>
			</TableCell>
			{!props.isTeacher && (
				<TableCell align="left" padding="normal">
					<Tooltip title={assignment.status ? 'Completed' : 'Pending'} arrow>
						<Avatar
							sx={{
								bgcolor: assignment.status ? green[400] : red[300],
								width: '30px',
								height: '30px',
							}}
						>
							<Icon>{assignment.status ? 'check' : 'clear'}</Icon>
						</Avatar>
					</Tooltip>
				</TableCell>
			)}
			{props.isTeacher && (
				<TableCell align="left" padding="normal">
					<Typography variant="body2" component="span">
						{assignment.submissions || 5}/{assignment.maxSubmissions || 10}
					</Typography>
				</TableCell>
			)}
		</TableRow>
	);
};

export default AssignmentEntry;
