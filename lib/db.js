import mongoose from 'mongoose';

const dbUrl =
	process.env.NODE_ENV === 'production'
		? process.env.MONGODB_URL
		: 'mongodb://localhost:27017/homework-scheduler';

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(dbUrl, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(mongoose => {
				return mongoose;
			});
	}

	cached.conn = await cached.promise;

	return cached.conn;
};
