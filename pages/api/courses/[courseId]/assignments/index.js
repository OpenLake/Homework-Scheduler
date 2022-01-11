import { dbConnect } from '../../../../../lib/db';
import catchErrors from '../../../../../helpers/api/catchErrors';
import { Assignment, Course, Submission } from '../../../../../models';

const handler = async (req, res) => {
	if (req.method !== 'GET') {
		throw new CustomError('Method not allowed', 405);
	}
	await dbConnect();
	const { courseId } = req.query;

	const allPromises = Promise.all([
		Course.findById(courseId),
		Assignment.find({ course: courseId }),
		Submission.find({ course: courseId }),
	]);

	const [course, assignments, submissions] = await allPromises;

	if (!course) {
		throw new CustomError('Course not found', 404);
	}

	const assignmentWithSubmissions = assignments.map(assignment => {
		const allSubmissions = submissions.filter(
			sub => sub._doc.assignment.toString() === assignment._doc._id.toString(),
		);
		return { ...assignment._doc, submissions: allSubmissions };
	});

	res.status(200).json(assignmentWithSubmissions);
};

export default catchErrors(handler);
