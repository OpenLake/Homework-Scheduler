import mongoose from 'mongoose';

const dbUrl =
	process.env.MONGODB_URL || 'mongodb://localhost:27017/homework-scheduler';

export const dbConnect = async () => {
	if (mongoose.connections[0].readyState) {
		return;
	}

	mongoose.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	mongoose.connection.once('open', () => {
		console.log('Connected to database');
	});

	mongoose.connection.on('error', err => {
		console.log('Mongoose connection error:', err);
	});
};
