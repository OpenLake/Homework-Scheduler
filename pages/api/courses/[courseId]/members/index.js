import { dbConnect } from '../../../../../lib/db';
import catchErrors from '../../../../../helpers/api/catchErrors';
import CustomError from '../../../../../helpers/api/CustomError';
import { User, Course } from '../../../../../models';

const handler = async (req, res) => {
	if (req.method !== 'GET') {
		throw new CustomError(405, 'Method not allowed');
	}
	await dbConnect();

	const { courseId } = req.query;

	const course = await Course.findById(courseId).populate('creator', {
		_id: 1,
		firstName: 1,
		lastName: 1,
	});

	if (!course) {
		throw new CustomError(404, 'Course not found');
	}

	const students = await User.find(
		{
			courses: { $in: [courseId] },
		},
		{ _id: 1, firstName: 1, lastName: 1 },
	);

	return res.status(200).json({
		teachers: [course.creator],
		students,
	});
};

export default catchErrors(handler);
