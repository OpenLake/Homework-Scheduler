import mongoose from 'mongoose';

const dbUrl =
	process.env.MONGODB_URL || 'mongodb://localhost:27017/homework-scheduler';

export const dbConnect = () => {
	return new Promise((resolve, reject) => {
		if (mongoose.connections[0].readyState) {
			return resolve();
		}

		mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		mongoose.connection.once('open', () => {
			resolve();
		});

		mongoose.connection.on('error', err => {
			reject(err);
		});
	});
};
