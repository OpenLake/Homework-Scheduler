import Cookies from 'cookies';
import catchErrors from '../../../helpers/api/catchErrors';

const handler = (req, res) => {
	if (req.method === 'POST') {
		const cookies = new Cookies(req, res, {
			secure: process.env.NODE_ENV === 'production',
		});
		cookies.set('auth', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			expires: new Date(0),
		});
		res.status(201).json({ message: 'Logged out' });
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
};

export default catchErrors(handler);
