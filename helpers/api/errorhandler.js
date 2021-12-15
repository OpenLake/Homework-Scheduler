export default function (err, res) {
	if (err.name === 'ValidationError') {
		const errors = Object.keys(err.errors).map(key => err.errors[key].message);
		res.status(400).json({ message: 'Validation failed', errors });
	} else if (err.name === 'MongoServerError') {
		if (err.code === 11000) {
			res.status(400).json({ message: 'Email already in use' });
		} else {
			res.status(500).json({ message: 'Internal server error' });
		}
	} else {
		res
			.status(err.statusCode || 500)
			.json({ message: err.message || 'Internal server error' });
	}
}
