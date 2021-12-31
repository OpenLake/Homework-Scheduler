import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const submissionSchema = mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	assignment: {
		type: ObjectId,
		ref: 'Assignment',
	},
	submittedBy: {
		type: ObjectId,
		ref: 'User',
	},
});

module.exports =
	mongoose.models?.Submission || mongoose.model('Submission', submissionSchema);
