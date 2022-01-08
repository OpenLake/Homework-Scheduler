import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
		enum: ['public', 'private'],
		required: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	description: {
		type: String,
	},
});

module.exports =
	mongoose.models?.Course || mongoose.model('Course', courseSchema);
