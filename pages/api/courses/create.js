import catchErrors from '../../../helpers/api/catchErrors';
import Course from '../../../models/Course';
import isAuth from '../../../middlewares/isAuth';

const handler = async (req, res) => {
	await isAuth(req, res);
	const { courseName, courseCode, courseType } = req.body;

	const course = await Course.create({
		courseName,
		courseCode,
		courseType,
		creator: req.user._id,
	});

	req.user.courses.push(course._id);

	await req.user.save();
	res.status(200).json(course);
};

export default catchErrors(handler);
