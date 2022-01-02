import { dbConnect } from '../../../../../lib/db';
import catchErrors from '../../../../../helpers/api/catchErrors';
import Assignment from '../../../../../models/Assignment';

const handler = async (req, res) => {
	if (req.method !== 'GET') {
		throw new CustomError(405, 'Method not allowed');
	}
	await dbConnect();

	const { courseId } = req.query;
	const assignments = await Assignment.find({ course: courseId });
	res.json(assignments);
};

export default catchErrors(handler);