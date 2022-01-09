import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import catchErrors from '../../../../../helpers/api/catchErrors';
import { Assignment, Course, User } from '../../../../../models';
import CustomError from '../../../../../helpers/api/CustomError';
import { format } from 'date-fns';

const handler = async (req, res) => {
	if (req.method !== 'GET') {
		throw new CustomError('Method not allowed', 405);
	}
	await dbConnect();
	await isAuth(req, res);

	const { courseId, monthandyear } = req.query;

	const allPromises = Promise.all([
		Course.findById(courseId),
		Assignment.find({ course: courseId }),
		User.find({ courses: { $in: [courseId] } }),
	]);

	const [course, assignments, students] = await allPromises;

	if (!course) {
		throw new CustomError('Course not found', 404);
	}

	const filteredAssignments = assignments.filter(assignment => {
		const dueDate = new Date(assignment._doc.dueDate);
		const monthAndYear = format(dueDate, 'MM-yyyy');
		return monthAndYear === monthandyear;
	});

	const counts = filteredAssignments.reduce((acc, assignment) => {
		const dueDate = new Date(assignment._doc.dueDate);
		const day = format(dueDate, 'dd');
		if (!acc[day]) {
			acc[day] = 1;
		} else {
			acc[day] += 1;
		}
		return acc;
	}, {});

	res.json(counts);
};

export default catchErrors(handler);
