import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import catchErrors from '../../../../../helpers/api/catchErrors';
import CustomError from '../../../../../helpers/api/CustomError';
import { Announcement, Course } from '../../../../../models';

const handler = async (req, res) => {
	await dbConnect();
	const { courseId } = req.query;
	switch (req.method) {
		case 'POST':
			await isAuth(req, res);
			const { content, type, assignmentId } = req.body;

			const course = await Course.findById(courseId);

			if (!course) {
				throw new CustomError('Course not found', 404);
			}

			const isTeacher = course.creator.toString() === req.user._id.toString();
			const isStudent = req.user.courses.includes(courseId);

			if (!isTeacher && !isStudent) {
				throw new CustomError('You are not authorized to do this', 401);
			}

			const announcement = new Announcement({
				content,
				course: courseId,
				user: req.user._id,
				type,
				assignment: assignmentId,
			});

			await announcement.save();
			res.status(201).json({ ...announcement._doc, user: req.user });
			break;
		default:
			throw new CustomError('Method not allowed', 405);
	}
};

export default catchErrors(handler);
