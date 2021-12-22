import Cookies from 'cookies';

const handler = (req, res) => {
	if (req.method === 'POST') {
		const cookies = new Cookies(req, res);
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

export default handler;
