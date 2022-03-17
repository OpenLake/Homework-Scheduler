import { dbConnect } from '../../../../../../lib/db';
import CustomError from '../../../../../../helpers/api/CustomError';
import catchErrors from '../../../../../../helpers/api/catchErrors';
import isAuth from '../../../../../../middlewares/api/isAuth';
import { Submission, Course } from '../../../../../../models';

const handler = async (req, res) => {
	if (req.method !== 'POST') {
		throw new CustomError('Method Not Allowed', 405);
	}

	await dbConnect();
	await isAuth(req, res);

	const { submissionId, courseId } = req.query;

	const [course, submission] = await Promise.all([
		Course.findById(courseId),
		Submission.findById(submissionId),
	]);

	if (!submission || !course) {
		throw new CustomError('Not Found', 404);
	}

	if (course.creator.toString() !== req.user._id.toString()) {
		throw new CustomError('Forbidden', 403);
	}

	const { marks, feedback } = req.body;
	if (marks) {
		submission.marks = marks;
	}
	submission.feedback = feedback;
	submission.status = 'graded';
	await submission.save();

	res.status(200).json(submission);
};

export default catchErrors(handler);
