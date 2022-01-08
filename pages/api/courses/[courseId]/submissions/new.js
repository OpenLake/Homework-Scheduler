import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import CustomError from '../../../../../helpers/api/CustomError';
import catchErrors from '../../../../../helpers/api/catchErrors';
import { Submission, Assignment } from '../../../../../models';

const handler = async (req, res) => {
	if (req.method !== 'POST') {
		throw new CustomError(405, 'Method not allowed');
	}

	await dbConnect();
	await isAuth(req, res);

	const { content, assignmentId } = req.body;

	const assignment = await Assignment.findById(assignmentId);

	if (!assignment) {
		throw new CustomError(404, 'Assignment not found');
	}

	const submission = new Submission({
		content,
		assignment,
		course: assignment.course,
		submittedBy: req.user._id,
	});

	await submission.save();

	res.status(201).json({ submission });
};

export default catchErrors(handler);
