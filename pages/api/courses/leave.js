import { dbConnect } from '../../../lib/db';
import catchErrors from '../../../helpers/api/catchErrors';
import CustomError from '../../../helpers/api/CustomError';
import { Course } from '../../../models';
import isAuth from '../../../middlewares/api/isAuth';

const handler = async (req, res) => {
	await dbConnect();
	await isAuth(req, res);

	const { courseId } = req.body;

	const course = await Course.findById(courseId);

	if (!course) {
		throw new CustomError('Course not found', 404);
	}

	if (req.user._id.toString() === course.creator.toString()) {
		throw new CustomError('You can not leave your own course', 400);
	}

	if (!req.user.courses.includes(course._id)) {
		throw new CustomError('You are not enrolled in this course', 400);
	}

	req.user.courses = req.user.courses.filter(
		c => c.toString() !== course._id.toString(),
	);

	await req.user.save();

	res.status(200).json(course);
};

export default catchErrors(handler);
