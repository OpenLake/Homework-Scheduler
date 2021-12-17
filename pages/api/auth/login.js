import Cookies from 'cookies';
import User from '../../../models/User';
import CustomError from '../../../helpers/api/CustomError';
import catchErrors from '../../../helpers/api/catchErrors';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			throw new CustomError('Invalid credentials', 401);
		}

		const verify = await user.comparePassword(req.body.password);

		if (!verify) {
			throw new CustomError('Invalid credentials', 401);
		}

		const token = user.generateAuthToken();

		const cookies = new Cookies(req, res);
		cookies.set('auth', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24 * 2,
		});
		res.status(201).json({ user, token });
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
};

export default catchErrors(handler);
