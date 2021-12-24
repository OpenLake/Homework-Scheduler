import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Stack, Typography, Button, Icon } from '@mui/material';

import CreateCourse from './CreateCourse';

const NoCourse = ({ title, subTitle, addBtn = true, browseBtn = true }) => {
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const router = useRouter();

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
				{title || 'You are not enrolled in any Courses'}
			</Typography>
			<Typography variant="body1" gutterBottom>
				{subTitle || 'Create or browse courses to enroll in them.'}
			</Typography>

			<Stack sx={{ pt: 2 }} direction="row" spacing={2} justifyContent="center">
				{addBtn && (
					<Button
						variant="contained"
						color="primary"
						onClick={() => setOpenCreateModal(true)}
					>
						<Icon>add</Icon>
						Create Course
					</Button>
				)}
				{browseBtn && (
					<Typography
						variant="h6"
						align="center"
						color="text.secondary"
						paragraph
					>
						OR
					</Typography>
				)}
				{browseBtn && (
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {
							router.push('/courses');
						}}
					>
						<Icon>search</Icon>
						Browse Courses
					</Button>
				)}
			</Stack>
		</Box>
	);
};

export default NoCourse;
