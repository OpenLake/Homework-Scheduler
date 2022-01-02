import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
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
				<TableCell padding="none" />
				<TableCell align="left" padding="default">
					S.No
				</TableCell>
				<TableCell
					align="left"
					padding="default"
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
					padding="default"
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
					<TableCell align="left" padding="default">
						Status
					</TableCell>
				)}
				{isTeacher && (
					<TableCell align="left" padding="default">
						Submissions
					</TableCell>
				)}
			</TableRow>
		</TableHead>
	);
};

const AssignmentTable = props => {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('title');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const onRequestSort = (property, event) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - props.assignments.length)
			: 0;

	return (
		<Paper>
			<TableContainer component={Paper} width="80%" sx={{ mt: 2 }}>
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
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((assignment, index) => (
								<AssignmentEntry
									key={assignment._id}
									assignment={assignment}
									isTeacher={props.isTeacher}
									index={index}
									courseId={props.courseId}
								/>
							))}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: 53 * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={props.assignments.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default AssignmentTable;
