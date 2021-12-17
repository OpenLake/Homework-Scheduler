import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import webRoutes from '../../helpers/webRoutes';
import { reqLogout } from '../../services/api/auth';
import authContext from '../../helpers/auth-context';
import { Link as MUILink } from '@mui/material';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = [
	webRoutes.dashboard,
	webRoutes.login,
	webRoutes.signup,
	webRoutes.about,
];
const settings = [webRoutes.profile];

const ResponsiveAppBar = () => {
	const router = useRouter();
	const { isAuthenticated, logout, user } = useContext(authContext);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = async () => {
		handleCloseUserMenu();
		await reqLogout();
		logout();
		router.replace('/login');
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Link href="/" passHref>
						<MUILink
							variant="h5"
							underline="none"
							color="inherit"
							sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
						>
							Homework Scheduler
						</MUILink>
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<Icon>menu</Icon>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map(page => {
								if (page.auth && !isAuthenticated) {
									return null;
								}
								return (
									<MenuItem key={page.title} onClick={handleCloseNavMenu}>
										<Link href={page.path} passHref>
											<Typography
												textAlign="center"
												sx={{ textTransform: 'capitalize' }}
											>
												{page.title}
											</Typography>
										</Link>
									</MenuItem>
								);
							})}
						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
					>
						Homework Scheduler
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => {
							if (page.auth && !isAuthenticated) {
								return null;
							}
							return (
								<Link href={page.path} key={page.title} passHref>
									<MUILink
										sx={{
											my: 2,
											mx: 1,
											color: 'white',
											display: 'block',
											textTransform: 'capitalize',
										}}
									>
										{page.title}
									</MUILink>
								</Link>
							);
						})}
					</Box>
					{isAuthenticated && (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										alt={user?.firstName}
										src="/static/images/avatar/2.jpg"
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map(setting => (
									<MenuItem key={setting.title} onClick={handleCloseUserMenu}>
										<Link href={setting.path} passHref>
											<Typography
												textAlign="center"
												sx={{ textTransform: 'capitalize' }}
											>
												{setting.title}
											</Typography>
										</Link>
									</MenuItem>
								))}
								<MenuItem onClick={handleLogout}>
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
