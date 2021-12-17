import { useState, useContext } from 'react';

import { useRouter } from 'next/router';
import authContext from '../../helpers/auth-context';
import AuthWarning from '../Utils/AuthWarning';
import CreateCourse from '../Course/CreateCourse';
import JoinCourse from '../Course/JoinCourse';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Icon } from '@mui/material';

const Home = () => {
	const router = useRouter();
	const [authWarning, setAuthWarning] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [joinModal, setJoinModal] = useState(false);
	const { isAuthenticated } = useContext(authContext);

	const handleClose = () => {
		setAuthWarning(false);
		setCreateModal(false);
		setJoinModal(false);
	};

	const onCreateCourse = () => {
		if (isAuthenticated) {
			setCreateModal(true);
		} else {
			setAuthWarning(true);
		}
	};

	const onJoinCourse = () => {
		if (isAuthenticated) {
			setJoinModal(true);
		} else {
			setAuthWarning(true);
		}
	};

	const onBrowseCourse = () => {
		router.push('/courses/browse');
	};

	return (
		<main>
			<Box
				sx={{
					bgcolor: 'background.paper',
					pt: 5,
					pb: 6,
				}}
			>
				<AuthWarning open={authWarning} handleClose={handleClose} />
				<CreateCourse open={createModal} handleClose={handleClose} />
				<JoinCourse open={joinModal} handleClose={handleClose} />
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
						A simple, easy to use, and free to use, homework scheduler. Helps to
						See the load on your students, and to schedule new assignments
						accordingly. Also gives you the insights of your students{"' "}
						performance.
					</Typography>
					<Typography
						variant="h4"
						align="center"
						color="text.secondary"
						paragraph
					>
						Also includes a calendar to keep track of the load on your students.
					</Typography>
					<Stack
						sx={{ pt: 2 }}
						direction="row"
						spacing={2}
						justifyContent="center"
					>
						<Button variant="contained" onClick={onCreateCourse}>
							<Icon>add</Icon>
							Create a course
						</Button>
						<Button variant="contained" onClick={onJoinCourse}>
							<Icon>arrow_forward</Icon>
							Join a course
						</Button>
					</Stack>
					<Stack>
						<Typography
							variant="h6"
							align="center"
							color="text.secondary"
							paragraph
							pt={2}
						>
							OR
						</Typography>
						<Button
							variant="outlined"
							sx={{ mx: 'auto' }}
							onClick={onBrowseCourse}
						>
							Browse through courses
							<Icon>search</Icon>
						</Button>
					</Stack>
				</Container>
			</Box>
		</main>
	);
};

export default Home;
