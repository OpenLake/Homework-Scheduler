import { Fragment, useState } from 'react';

import {
	TableRow,
	Tooltip,
	Typography,
	TableCell,
	Collapse,
	Icon,
	IconButton,
	Avatar,
	Stack,
	Button,
} from '@mui/material';
import { red, green } from '@mui/material/colors';
import Link from 'next/link';

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
	const [open, setOpen] = useState(false);

	return (
		<Fragment key={assignment._id}>
			<TableRow>
				<TableCell>
					<IconButton onClick={() => setOpen(!open)} size="small">
						<Tooltip title="Show Details">
							<Icon>{open ? 'expand_less' : 'expand_more'}</Icon>
						</Tooltip>
					</IconButton>
				</TableCell>
				<TableCell align="left" padding="default">
					<Tooltip title="S.No">
						<Typography variant="body2" component="span">
							{props.index + 1}
						</Typography>
					</Tooltip>
				</TableCell>
				<TableCell align="left" padding="default">
					<Tooltip title="Title">
						<Typography variant="body2" component="span" noWrap>
							{assignment.title}
						</Typography>
					</Tooltip>
				</TableCell>
				<TableCell align="left" padding="default">
					<Tooltip title={calculateDaysLeft(assignment.dueDate)} arrow>
						<Typography variant="body2" component="span">
							{formatDate(assignment.dueDate)}
						</Typography>
					</Tooltip>
				</TableCell>
				{!props.isTeacher && (
					<TableCell align="left" padding="default">
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
					<TableCell align="left" padding="default">
						<Typography variant="body2" component="span">
							{assignment.submissions || 5}/{assignment.maxSubmissions || 10}
						</Typography>
					</TableCell>
				)}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Stack direction="column" my={2}>
							<div
								dangerouslySetInnerHTML={{
									__html: assignment.description,
								}}
							/>
							{props.isTeacher && (
								<Link passHref href={`/courses/${props.courseId}/submissions`}>
									<Button
										variant="contained"
										color="warning"
										size="small"
										sx={{ width: 'fit-content' }}
									>
										View Submissions
									</Button>
								</Link>
							)}
							{!props.isTeacher && (
								<Link
									passHref
									href={`/courses/${props.courseId}/submissions/${
										assignment.status ? `${assignment.submission}` : 'new'
									}`}
								>
									<Button
										variant="contained"
										color="warning"
										size="small"
										sx={{ width: 'fit-content' }}
									>
										{assignment.status ? 'View Submission' : 'Submit'}
									</Button>
								</Link>
							)}
						</Stack>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default AssignmentEntry;
