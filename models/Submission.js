import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const submissionSchema = mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	assignment: {
		type: ObjectId,
		ref: 'Assignment',
	},
	course: {
		type: ObjectId,
		ref: 'Course',
	},
	submittedBy: {
		type: ObjectId,
		ref: 'User',
	},
	marks: {
		type: Number,
	},
	status: {
		type: String,
		enum: ['pending', 'graded'],
		default: 'pending',
	},
	feedback: {
		type: String,
	},
});

module.exports =
	mongoose.models?.Submission || mongoose.model('Submission', submissionSchema);
