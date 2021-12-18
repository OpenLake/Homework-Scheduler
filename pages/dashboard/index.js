import React from 'react';
import Typography from '@mui/material/Typography';
import webRoutes from '../../helpers/webRoutes';

import isAuth from '../../middlewares/isAuth';
import Container from '@mui/material/Container';

const dashboard = ({ user }) => {
	return (
		<Container maxWidth="md" sx={{ mt: 2 }}>
			<Typography variant="h3" component="h1">
				Dashboard
			</Typography>
			<Typography variant="h6" component="h2" color="textSecondary">
				Welcome Back {user.firstName} {user.lastName}
			</Typography>
		</Container>
	);
};

export const getServerSideProps = isAuth(async (ctx, user) => {
	return {
		props: { user },
	};
}, webRoutes.dashboard);

export default dashboard;
