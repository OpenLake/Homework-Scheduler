const DOMAIN =
	process.env.NODE_ENV === 'production'
		? 'https://our-domain.com'
		: 'http://localhost:3000';

const isAuth = (getServerSidePropsFunction, webRoute) => {
	return async ctx => {
		const { req } = ctx;
		const token = req.cookies?.auth || null;

		if (!token && !webRoute.beforeAuth) {
			return {
				redirect: {
					destination: webRoute.redirect,
					permanent: false,
				},
			};
		}

		if (token && !webRoute.afterAuth) {
			return {
				redirect: {
					destination: webRoute.redirect,
					permanent: false,
				},
			};
		}

		if (!token) {
			return await getServerSidePropsFunction(ctx);
		}

		const response = await fetch(`${DOMAIN}/api/auth/check`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			credentials: 'include',
		});

		if (!response.ok) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			};
		}

		const data = await response.json();

		return await getServerSidePropsFunction(ctx, data.user || null);
	};
};

export default isAuth;
