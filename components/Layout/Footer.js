import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Copyright = () => {
	return (
		<Typography variant="body2" color="text.secondary">
			{'Copyright © '}
			<Link color="inherit" href="/">
				Homework Scheduler
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const Footer = () => {
	return (
		<Box
			sx={{
				mt: 'auto',
				width: '100%',
				height: '50px',
				backgroundColor: 'background.paper',
				borderTop: '1px solid rgba(0, 0, 0, 0.12)',
				padding: '1rem',
				zIndex: '1',
			}}
		>
			<Container maxWidth="xl">
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						height: '100%',
					}}
				>
					<Copyright />
				</Box>
			</Container>
		</Box>
	);
};

export default Footer;
