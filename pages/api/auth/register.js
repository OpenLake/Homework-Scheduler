import Cookies from 'cookies';
import catchErrors from '../../../helpers/api/catchErrors';
import { dbConnect } from '../../../lib/db';
import User from '../../../models/User';

const handler = async (req, res) => {
	await dbConnect();

	if (req.method === 'POST') {
		const user = new User(req.body);
		await user.hashPassword();
		await user.save();

		const token = user.generateAuthToken();

		const cookies = new Cookies(req, res, {
			secure: process.env.NODE_ENV === 'production',
		});
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
