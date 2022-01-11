import { Box, Divider, Stack, Typography } from '@mui/material';

const Stats = ({ submissions, assignedTo }) => {
	return (
		<Box>
			<Typography variant="h4" fontWeight={2}>
				Stats
			</Typography>
			<Divider />
			<Stack direction="row" spacing={5} mt={2}>
				<Box>
					<Typography variant="h4" fontWeight={1} textAlign="center">
						{submissions || 0}
					</Typography>
					<Typography variant="caption">Submissions</Typography>
				</Box>
				<Box>
					<Typography variant="h4" fontWeight={1} textAlign="center">
						{assignedTo || 'All'}
					</Typography>
					<Typography variant="caption">Assigned</Typography>
				</Box>
			</Stack>
		</Box>
	);
};

export default Stats;
