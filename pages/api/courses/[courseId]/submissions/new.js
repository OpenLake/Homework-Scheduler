import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import CustomError from '../../../../../helpers/api/CustomError';
import catchErrors from '../../../../../helpers/api/catchErrors';
import { Submission, Assignment } from '../../../../../models';

const handler = async (req, res) => {
	if (req.method !== 'POST') {
		throw new CustomError('Method not allowed', 405);
	}

	await dbConnect();
	await isAuth(req, res);

	const { content, assignmentId, timeTaken } = req.body;

	const assignment = await Assignment.findById(assignmentId);

	if (!assignment) {
		throw new CustomError('Assignment not found', 404);
	}

	const isEnrolled = req.user.courses.includes(assignment.course);

	if (!isEnrolled) {
		throw new CustomError('You are not enrolled in this course', 403);
	}

	const submission = new Submission({
		content,
		assignment,
		timeTaken,
		course: assignment.course,
		submittedBy: req.user._id,
	});

	await submission.save();

	res.status(201).json({ submission });
};

export default catchErrors(handler);
