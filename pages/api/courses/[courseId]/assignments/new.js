import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import CustomError from '../../../../../helpers/api/CustomError';
import catchErrors from '../../../../../helpers/api/catchErrors';
import Assignment from '../../../../../models/Assignment';
import Course from '../../../../../models/Course';

const handler = async (req, res) => {
	if (req.method !== 'POST') {
		throw new CustomError(405, 'Method not allowed');
	}

	await dbConnect();
	await isAuth(req, res);

	const { courseId } = req.query;
	const { title, description, dueDate, assignedTo } = req.body;

	const course = await Course.findById(courseId);

	if (!course) {
		throw new CustomError(404, 'Course not found');
	}

	if (course.creator.toString() !== req.user._id.toString()) {
		throw new CustomError(403, 'You are not authorized to perform this action');
	}

	const assignment = new Assignment({
		title,
		description,
		dueDate: new Date(dueDate),
		course: courseId,
		assignedTo: assignedTo ? assignedTo : [],
		createdBy: req.user._id,
	});

	await assignment.save();

	res.status(201).json({ message: 'Assignment created successfully' });
};

export default catchErrors(handler);
