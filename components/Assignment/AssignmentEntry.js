import { useRouter } from 'next/router';
import {
	TableRow,
	Tooltip,
	Typography,
	TableCell,
	Icon,
	Avatar,
} from '@mui/material';
import { red, green, yellow } from '@mui/material/colors';

const formatDate = date => {
	const d = new Date(date);
	return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const calculateDaysLeft = (dueDate, status) => {
	const d = new Date(dueDate);
	const now = new Date();
	const diff = d.getTime() - now.getTime();
	const daysLeft = Math.ceil(diff / (1000 * 3600 * 24));
	if (daysLeft < 0) {
		return status ? 'Completed' : 'Overdue';
	} else if (daysLeft === 0) {
		return 'Due Today';
	} else if (daysLeft === 1) {
		return 'Due Tomorrow';
	}
	return `Due in ${daysLeft} days`;
};

const AssignmentEntry = props => {
	const router = useRouter();
	const { assignment } = props;
	const auth = props.isEnrolled !== 'unauthenticated';

	const handleClick = () => {
		router.push(`${router.asPath}/${assignment._id}`);
	};

	return (
		<TableRow hover sx={{ cursor: 'pointer' }} onClick={handleClick}>
			<TableCell align="left" padding="normal">
				<Typography variant="body2" component="span" noWrap>
					{assignment.title}
				</Typography>
			</TableCell>
			<TableCell
				align={!auth || !props.isEnrolled ? 'center' : 'left'}
				padding="normal"
			>
				<Typography variant="body2">
					{formatDate(assignment.dueDate)}
				</Typography>
				{auth && props.isEnrolled && (
					<Typography variant="body3" color="textSecondary">
						{calculateDaysLeft(assignment.dueDate, assignment.status)}
					</Typography>
				)}
			</TableCell>
			{!props.isTeacher && auth && props.isEnrolled && (
				<TableCell align="left" padding="normal">
					<Tooltip
						title={assignment.status ? 'Completed' : 'Pending'}
						arrow
						placement="left"
					>
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
			{props.isTeacher && auth && (
				<TableCell align="center" padding="normal">
					<Typography variant="body2" component="span">
						{assignment.submissions}
					</Typography>
				</TableCell>
			)}
		</TableRow>
	);
};

export default AssignmentEntry;
