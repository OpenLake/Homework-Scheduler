import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import catchErrors from '../../../../../helpers/api/catchErrors';
import CustomError from '../../../../../helpers/api/CustomError';
import { Announcement, Course } from '../../../../../models';

const handler = async (req, res) => {
	await dbConnect();

	if (req.method !== 'PUT' && req.method !== 'DELETE') {
		throw new CustomError('Method not allowed', 405);
	}

	await isAuth(req, res);
	const { announcementId } = req.query;

	if (req.method === 'PUT') {
		const { content } = req.body;
		const announcement = await Announcement.findOneAndUpdate(
			{ _id: announcementId, user: req.user._id },
			{ content },
			{ new: true, runValidators: true },
		);

		return res.status(200).json(announcement);
	} else if (req.method === 'DELETE') {
		const announcement = await Announcement.findById(announcementId);

		if (!announcement) {
			throw new CustomError('Announcement not found', 404);
		}

		const course = await Course.findById(announcement.course);
		const isTeacher = req.user._id.toString() === course.creator.toString();

		if (isTeacher || announcement.user.toString() === req.user._id.toString()) {
			await announcement.remove();
			return res.status(200).json(announcement);
		} else {
			throw new CustomError(
				'You are not allowed to delete this announcement',
				403,
			);
		}
	}
};

export default catchErrors(handler);
