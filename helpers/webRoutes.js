/**
 * @description WebRoutes
 * @field {Boolean} beforeAuth - Should it be available before authentication?
 * @field {Boolean} afterAuth - Should it be available after authentication?
 * @field {String} path - Path to the route
 * @field {String} title - Title of the route
 * @field {String} redirect - Redirect path
 */
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
	todo: {
		beforeAuth: false,
		afterAuth: true,
		path: '/dashboard/todo',
		title: 'Todo',
		redirect: '/',
	},
	profile: {
		beforeAuth: false,
		afterAuth: true,
		path: '/profile',
		title: 'Profile',
		redirect: '/login',
	},
	courses: {
		beforeAuth: true,
		afterAuth: true,
		path: '/courses',
		title: 'Browse Courses',
	},
	course: id => ({
		beforeAuth: false,
		afterAuth: true,
		path: `/courses/${id}`,
		redirect: '/login',
	}),
	newAssignment: {
		beforeAuth: false,
		afterAuth: true,
		redirect: '/login',
	},
	submissions: {
		beforeAuth: false,
		afterAuth: true,
		redirect: '/login',
	},
};

export default webRoutes;
