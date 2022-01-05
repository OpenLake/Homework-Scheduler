import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import catchErrors from '../../../../../helpers/api/catchErrors';
import Assignment from '../../../../../models/Assignment';
import Course from '../../../../../models/Course';
import Submission from '../../../../../models/Submission';

const handler = async (req, res) => {
	if (req.method !== 'GET') {
		throw new CustomError(405, 'Method not allowed');
	}
	await dbConnect();
	const { courseId } = req.query;
	const course = await Course.findById(courseId);

	if (!course) {
		throw new CustomError(404, 'Course not found');
	}

	const assignments = await Assignment.find({ course: courseId });

	try {
		await isAuth(req, res);
		const isTeacher = req.user._id.toString() === course.creator.toString();
		if (isTeacher) {
			const submissions = await Submission.find({ course: courseId });
			const data = assignments.map(assignment => {
				const submission = submissions.filter(
					sub => sub.assignment.toString() === assignment._id.toString(),
				).length;
				return {
					...assignment.toObject(),
					submissions: submission,
				};
			});

			res.status(200).json(data);
		} else {
			const submissions = await Submission.find({
				course: courseId,
				submittedBy: req.user._id,
			});
			const data = assignments.map(assignment => {
				const status = !!submissions.find(
					sub => sub.assignment.toString() === assignment._id.toString(),
				);
				return {
					...assignment.toObject(),
					status,
				};
			});

			res.status(200).json(data);
		}
	} catch (e) {
		return res.json(assignments);
	}
};

export default catchErrors(handler);
