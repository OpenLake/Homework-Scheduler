import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import CustomError from '../../../../../helpers/api/CustomError';
import catchErrors from '../../../../../helpers/api/catchErrors';
import { Assignment, Course } from '../../../../../models';

const handler = async (req, res) => {
	if (req.method !== 'POST') {
		throw new CustomError('Method not allowed', 405);
	}

	await dbConnect();
	await isAuth(req, res);

	const { courseId } = req.query;
	const { title, description, dueDate, assignedTo, maxMarks, expectedTime } =
		req.body;

	const course = await Course.findById(courseId);

	if (!course) {
		throw new CustomError('Course not found', 404);
	}

	if (course.creator.toString() !== req.user._id.toString()) {
		throw new CustomError('You are not authorized to perform this action', 403);
	}

	const assignment = new Assignment({
		title,
		description,
		maxMarks,
		expectedTime,
		dueDate: new Date(dueDate),
		course: courseId,
		assignedTo: assignedTo ? assignedTo : [],
		createdBy: req.user._id,
	});

	await assignment.save();

	res.status(201).json({ message: 'Assignment created successfully' });
};

export default catchErrors(handler);
