const webRoutes = {
	home: { auth: false, path: '/', title: 'Home' },
	login: { auth: false, path: '/login', title: 'Login' },
	signup: { auth: false, path: '/signup', title: 'Signup' },
	dashboard: { auth: true, path: '/dashboard', title: 'Dashboard' },
	profile: { auth: true, path: '/profile', title: 'Profile' },
	about: { auth: false, path: '/about', title: 'About' },
};

export default webRoutes;
