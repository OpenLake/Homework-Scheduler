import { useState, useContext } from 'react';

import { useRouter } from 'next/router';
import authContext from '../../helpers/auth-context';
import CreateCourse from '../Course/CreateCourse';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Icon } from '@mui/material';

const Home = () => {
	const router = useRouter();
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const { isAuthenticated } = useContext(authContext);

	const handleClose = () => {
		setOpenCreateModal(false);
	};

	const onCreateCourse = () => {
		if (isAuthenticated) {
			setOpenCreateModal(true);
		} else {
			router.push('/login');
		}
	};

	const onBrowseCourse = () => {
		router.push('/courses');
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				mt: 'auto',
			}}
		>
			<CreateCourse open={openCreateModal} handleClose={handleClose} />
			<Container maxWidth="sm">
				<Typography
					component="h1"
					variant="h3"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Welcome!
				</Typography>
				<Typography
					variant="h6"
					align="center"
					color="text.secondary"
					paragraph
				>
					Helps teachers decide homework deadlines by keeping a track of other
					commitments and assignments of the students.
				</Typography>
				<Typography
					variant="h4"
					align="center"
					color="text.secondary"
					paragraph
				>
					Also includes a calendar to keep track of the events and deadlines of
					the students.
				</Typography>
				<Stack
					sx={{ pt: 2 }}
					direction={{ xs: 'column', sm: 'row' }}
					spacing={2}
					justifyContent="center"
				>
					<Button variant="contained" onClick={onCreateCourse}>
						<Icon>add</Icon>
						Create a course
					</Button>
					<Typography
						variant="h6"
						align="center"
						color="text.secondary"
						paragraph
					>
						OR
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						onClick={onBrowseCourse}
					>
						<Icon>search</Icon>
						Browse Courses
					</Button>
				</Stack>
			</Container>
		</Box>
	);
};

export default Home;
