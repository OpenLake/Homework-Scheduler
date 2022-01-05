import { dbConnect } from '../../../../lib/db';
import isAuth from '../../../../middlewares/api/isAuth';
import Course from '../../../../models/Course';
import catchErrors from '../../../../helpers/api/catchErrors';
import CustomError from '../../../../helpers/api/CustomError';

const handler = async (req, res) => {
	if (req.method !== 'GET') {
		throw new CustomError(405, 'Method not allowed');
	}
	await dbConnect();

	let isTeacher;
	let isEnrolled;
	const { courseId } = req.query;
	const course = await Course.findById(courseId);

	if (!course) {
		throw new CustomError(404, 'Course not found');
	}

	try {
		await isAuth(req, res);
		isTeacher = course.creator.toString() === req.user._id.toString();
		isEnrolled = req.user.courses.includes(courseId);
	} catch (e) {
		isTeacher = false;
		isEnrolled = 'unauthenticated';
	}

	return res.status(200).json({ course, isTeacher, isEnrolled });
};

export default catchErrors(handler);
