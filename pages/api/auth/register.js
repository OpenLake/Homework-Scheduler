import Cookies from 'cookies';
import catchErrors from '../../../helpers/api/catchErrors';
import CustomError from '../../../helpers/api/CustomError';
import User from '../../../models/User';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const user = new User(req.body);
		await user.hashPassword();
		await user.save();

		const token = user.generateAuthToken();

		const cookies = new Cookies(req, res);
		cookies.set('auth', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24 * 2,
		});

		res.status(201).json({ user, token });
	} else {
		throw new CustomError('Method not allowed', 405);
	}
};

export default catchErrors(handler);
