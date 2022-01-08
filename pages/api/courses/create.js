import { dbConnect } from '../../../lib/db';
import catchErrors from '../../../helpers/api/catchErrors';
import Course from '../../../models/Course';
import isAuth from '../../../middlewares/api/isAuth';

const handler = async (req, res) => {
	await dbConnect();

	await isAuth(req, res);
	const { name, code, type, description } = req.body;

	const course = await Course.create({
		name,
		code,
		type,
		description,
		creator: req.user._id,
	});

	await req.user.save();
	res.status(200).json(course);
};

export default catchErrors(handler);
