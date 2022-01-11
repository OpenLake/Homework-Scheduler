import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const announcementSchema = new Schema(
	{
		type: {
			type: String,
			default: 'general',
			enum: ['general', 'assignment'],
		},
		content: {
			type: String,
			required: true,
		},
		course: {
			type: ObjectId,
			ref: 'Course',
		},
		user: {
			type: ObjectId,
			ref: 'User',
		},
		assignment: {
			type: ObjectId,
			ref: 'Assignment',
		},
	},
	{ timestamps: true },
);

module.exports =
	mongoose.models?.Announcement ||
	mongoose.model('Announcement', announcementSchema);
