import React from 'react';
import Typography from '@mui/material/Typography';
import webRoutes from '../../helpers/webRoutes';

import isAuth from '../../middlewares/isAuth';
import Container from '@mui/material/Container';

const Dashboard = props => {
	const user = JSON.parse(props.user);
	return (
		<Container maxWidth="md" sx={{ mt: 2 }}>
			<Typography variant="h4" sx={{ mb: 2 }}>
				Welcome {user.firstName} {user.lastName}
			</Typography>
		</Container>
	);
};

export const getServerSideProps = isAuth(async (ctx, user) => {
	return {
		props: { user: JSON.stringify(user) },
	};
}, webRoutes.dashboard);

export default Dashboard;
