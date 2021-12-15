import { dbConnect } from '../../../lib/db';
import catchErrors from '../../../helpers/api/catchErrors';
import CustomError from '../../../helpers/api/CustomError';
import User from '../../../models/User';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		await dbConnect();

		const user = new User(req.body);
		await user.hashPassword();
		await user.save();

		const token = user.generateAuthToken();
		res.status(201).json({ user, token });
	} else {
		throw new CustomError('Method not allowed', 405);
	}
};

export default catchErrors(handler);
