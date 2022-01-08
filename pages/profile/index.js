import Typography from '@mui/material/Typography';
import webRoutes from '../../helpers/webRoutes';

import isAuth from '../../middlewares/isAuth';
import Container from '@mui/material/Container';

const dashboard = props => {
	const user = JSON.parse(props.user);

	return (
		<Container maxWidth="md" sx={{ mt: 2 }}>
			<Typography variant="h3" component="h1">
				Profile
			</Typography>
			<Typography variant="h6" component="h2" color="textSecondary">
				Welcome Back {user.firstName} {user.lastName}
			</Typography>
		</Container>
	);
};

export const getServerSideProps = isAuth(async (ctx, user) => {
	return {
		props: { user: JSON.stringify(user) },
	};
}, webRoutes.profile);

export default dashboard;
