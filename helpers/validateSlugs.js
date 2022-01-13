import mongoose from 'mongoose';

export const isValidID = id => mongoose.Types.ObjectId.isValid(id);

export const validateSlugs = ctx => {
	const { courseId, assignmentId } = ctx.query;

	if (courseId && !isValidID(courseId)) {
		return false;
	}

	if (assignmentId && !isValidID(assignmentId)) {
		return false;
	}

	return true;
};
