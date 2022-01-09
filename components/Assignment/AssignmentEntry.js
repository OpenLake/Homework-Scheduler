import { useContext } from 'react';
import { useRouter } from 'next/router';

import authContext from '../../helpers/auth-context';

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
	if (status) {
		return 'Completed';
	}

	const d = new Date(dueDate);
	const now = new Date();
	const diff = d.getTime() - now.getTime();
	const daysLeft = Math.ceil(diff / (1000 * 3600 * 24));
	if (daysLeft < 0) {
		return 'Overdue';
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
	const { user, isAuthenticated: auth } = useContext(authContext);

	const handleClick = () => {
		router.push(`${router.asPath}/${assignment._id}`);
	};

	const status = assignment.submissions?.find(
		sub => sub.submittedBy.toString() === user?._id.toString(),
	);

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
						{calculateDaysLeft(assignment.dueDate, status)}
					</Typography>
				)}
			</TableCell>
			{!props.isTeacher && auth && props.isEnrolled && (
				<TableCell align="left" padding="normal">
					<Tooltip
						title={status ? 'Completed' : 'Pending'}
						arrow
						placement="left"
					>
						<Avatar
							sx={{
								bgcolor: status ? green[400] : red[300],
								width: '30px',
								height: '30px',
							}}
						>
							<Icon>{status ? 'check' : 'clear'}</Icon>
						</Avatar>
					</Tooltip>
				</TableCell>
			)}
			{props.isTeacher && auth && (
				<TableCell align="center" padding="normal">
					<Typography variant="body2" component="span">
						{assignment.submissions?.length || 0}
					</Typography>
				</TableCell>
			)}
		</TableRow>
	);
};

export default AssignmentEntry;
