import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const assignmentSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	dueDate: {
		type: Date,
		required: true,
	},
	course: {
		type: ObjectId,
		ref: 'Course',
	},
	createdBy: {
		type: ObjectId,
		ref: 'User',
	},
	assignedTo: [
		{
			type: ObjectId,
			ref: 'User',
		},
	],
	submissions: [
		{
			type: ObjectId,
			ref: 'Submission',
		},
	],
});

module.exports =
	mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);
