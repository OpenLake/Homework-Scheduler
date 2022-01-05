import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { Toolbar } from '@mui/material';
import AssignmentEntry from './AssignmentEntry';

const descendingComparator = (a, b, orderBy) => {
	if (orderBy === 'dueDate') {
		return new Date(b.dueDate) - new Date(a.dueDate);
	}

	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
};

const getComparator = (order, orderBy) => {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

const AssignmentTableHeader = ({
	order,
	orderBy,
	onRequestSort,
	isTeacher,
}) => {
	return (
		<TableHead>
			<TableRow>
				<TableCell
					align="left"
					padding="normal"
					sortDirection={orderBy === 'title' ? order : false}
				>
					<Tooltip title="Sort" enterDelay={300}>
						<TableSortLabel
							active={orderBy === 'title'}
							direction={orderBy === 'title' ? order : 'asc'}
							onClick={event => onRequestSort('title', event)}
						>
							Title
						</TableSortLabel>
					</Tooltip>
				</TableCell>
				<TableCell
					align="left"
					padding="normal"
					sortDirection={orderBy === 'dueDate' ? order : false}
				>
					<Tooltip title="Sort" enterDelay={300}>
						<TableSortLabel
							active={orderBy === 'dueDate'}
							direction={orderBy === 'dueDate' ? order : 'asc'}
							onClick={event => onRequestSort('dueDate', event)}
						>
							Due Date
						</TableSortLabel>
					</Tooltip>
				</TableCell>
				{!isTeacher && (
					<TableCell align="left" padding="normal">
						Status
					</TableCell>
				)}
				{isTeacher && (
					<TableCell align="left" padding="normal">
						Submissions
					</TableCell>
				)}
			</TableRow>
		</TableHead>
	);
};

const AssignmentTable = props => {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('dueDate');

	const onRequestSort = (property, event) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	return (
		<Paper>
			<TableContainer component={Paper} sx={{ mt: 2 }}>
				<Toolbar
					sx={{
						pl: { sm: 2 },
						pr: { xs: 1, sm: 1 },
					}}
				>
					<Typography sx={{ flex: '1 1 100%' }} variant="h5" component="div">
						{props.assignments.length} Assignments
					</Typography>
				</Toolbar>
				<Table>
					<AssignmentTableHeader
						order={order}
						orderBy={orderBy}
						onRequestSort={onRequestSort}
						isTeacher={props.isTeacher}
					/>
					<TableBody>
						{props.assignments
							.slice()
							.sort(getComparator(order, orderBy))
							.map(assignment => (
								<AssignmentEntry
									key={assignment._id}
									assignment={assignment}
									isTeacher={props.isTeacher}
									courseId={props.courseId}
								/>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default AssignmentTable;
