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

		const response = await fetch('http://localhost:3000/api/auth/check', {
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
