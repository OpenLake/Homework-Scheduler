import mongoose from 'mongoose';

const dbUrl =
	process.env.NODE_ENV === 'production'
		? process.env.MONGODB_URL
		: 'mongodb://localhost:27017/homework-scheduler';

export const dbConnect = () => {
	return new Promise((resolve, reject) => {
		if (mongoose.connection.readyState === 1) {
			return resolve();
		}

		mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		mongoose.connection.once('open', () => {
			return resolve();
		});

		mongoose.connection.on('error', err => {
			return reject(err);
		});
	});
};
