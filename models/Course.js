import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
	courseName: {
		type: String,
		required: true,
	},
	courseCode: {
		type: String,
		required: true,
		unique: true,
	},
	courseType: {
		type: String,
		enum: ['public', 'private'],
		required: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports =
	mongoose.models.Course || mongoose.model('Course', courseSchema);
