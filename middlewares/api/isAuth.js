import CustomError from '../../helpers/api/CustomError';
import User from '../../models/User';
import Cookies from 'cookies';

const isAuth = async (req, res) => {
	const cookies = new Cookies(req, res);
	const token = cookies.get('auth');

	if (!token) {
		throw new CustomError({ message: 'You are not logged in' }, 401);
	}

	const user = await User.verifyToken(token);

	req.user = user;
};

export default isAuth;
