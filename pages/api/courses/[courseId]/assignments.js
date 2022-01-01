import catchErrors from '../../../../helpers/api/catchErrors';
import CustomError from '../../../../helpers/api/CustomError';
import Assignment from '../../../../models/Assignment';

const handler = async (req, res) => {
	const { courseId } = req.query;
	const assignments = await Assignment.find({ course: courseId });
	res.json(assignments);
};

export default catchErrors(handler);
