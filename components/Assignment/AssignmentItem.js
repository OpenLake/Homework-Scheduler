import { Typography } from '@mui/material';

const AssignmentItem = ({ assignment }) => {
	return <Typography variant="body1">{assignment.title}</Typography>;
};

export default AssignmentItem;
