const webRoutes = {
	login: {
		beforeAuth: true,
		afterAuth: false,
		path: '/login',
		title: 'Login',
		redirect: '/dashboard',
	},
	signup: {
		beforeAuth: true,
		afterAuth: false,
		path: '/signup',
		title: 'Signup',
		redirect: '/dashboard',
	},
	dashboard: {
		beforeAuth: false,
		afterAuth: true,
		path: '/dashboard',
		title: 'Dashboard',
		redirect: '/',
	},
	profile: {
		beforeAuth: false,
		afterAuth: true,
		path: '/profile',
		title: 'Profile',
		redirect: '/login',
	},
	about: { beforeAuth: true, afterAuth: true, path: '/about', title: 'About' },
};

export default webRoutes;
