import { dbConnect } from '../../../lib/db';
import User from '../../../models/User';
import CustomError from '../../../helpers/api/CustomError';
import catchErrors from '../../../helpers/api/catchErrors';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		await dbConnect();

		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			throw new CustomError('Invalid credentials', 401);
		}

		const verify = await user.comparePassword(req.body.password);

		if (!verify) {
			throw new CustomError('Invalid credentials', 401);
		}

		const token = user.generateAuthToken();

		res.status(201).json({ user, token });
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
};

export default catchErrors(handler);
