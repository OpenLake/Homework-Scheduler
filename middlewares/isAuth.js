import { dbConnect } from '../lib/db';
import { User } from '../models';

const isAuth = (getServerSidePropsFunction, webRoute) => {
	return async ctx => {
		await dbConnect();
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

		try {
			const user = await User.verifyToken(token);
			return await getServerSidePropsFunction(ctx, user);
		} catch (err) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			};
		}
	};
};

export default isAuth;
