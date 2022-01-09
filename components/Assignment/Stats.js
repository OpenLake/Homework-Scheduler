import { Box, Divider, Stack, Typography } from '@mui/material';

const Stats = ({ submissions, assignedTo }) => {
	return (
		<Box>
			<Typography variant="h4">Stats</Typography>
			<Stack direction="row" spacing={5}>
				<Box>
					<Typography variant="h4" fontWeight={1}>
						{submissions || 0}
					</Typography>
					<Typography variant="caption">Submissions</Typography>
				</Box>
				<Divider orientation="vertical" flexItem />
				<Box>
					<Typography variant="h4" fontWeight={1}>
						{assignedTo || 'All'}
					</Typography>
					<Typography variant="caption">Assigned</Typography>
				</Box>
			</Stack>
		</Box>
	);
};

export default Stats;
