import { useState } from 'react';
import { Box, Stack, Typography, Button, Icon } from '@mui/material';

import CreateCourse from './CreateCourse';

const NoCourse = () => {
	const [openCreateModal, setOpenCreateModal] = useState(false);

	return (
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				textAlign: 'center',
				width: '100%',
			}}
		>
			<CreateCourse
				open={openCreateModal}
				handleClose={() => setOpenCreateModal(false)}
			/>
			<Typography variant="h3" gutterBottom>
				You are not enrolled in any Courses
			</Typography>
			<Typography variant="body1" gutterBottom>
				Create or browse courses to enroll in them.
			</Typography>
			<Stack sx={{ pt: 2 }} direction="row" spacing={2} justifyContent="center">
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpenCreateModal(true)}
				>
					<Icon>add</Icon>
					Create Course
				</Button>
				<Typography
					variant="h6"
					align="center"
					color="text.secondary"
					paragraph
				>
					OR
				</Typography>
				<Button variant="contained" color="secondary">
					<Icon>search</Icon>
					Browse Courses
				</Button>
			</Stack>
		</Box>
	);
};

export default NoCourse;
