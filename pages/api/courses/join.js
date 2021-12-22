import catchErrors from '../../../helpers/api/catchErrors';
import CustomError from '../../../helpers/api/CustomError';
import Course from '../../../models/Course';
import isAuth from '../../../middlewares/api/isAuth';

const handler = async (req, res) => {
	await isAuth(req, res);

	const { courseCode } = req.body;

	const course = await Course.findOne({ courseCode });

	if (!course) {
		throw new CustomError('Course not found', 404);
	}

	if (req.user.courses.includes(course._id)) {
		throw new CustomError('You are already enrolled in this course', 400);
	}

	req.user.courses.push(course._id);
	await req.user.save();

	res.status(200).json(course);
};

export default catchErrors(handler);
