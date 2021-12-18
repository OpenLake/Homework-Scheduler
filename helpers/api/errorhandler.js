export default function (err, res) {
	if (err.name === 'ValidationError') {
		const errors = Object.keys(err.errors).map(key => err.errors[key].message);
		res.status(400).json({ message: 'Validation failed', errors });
	} else if (err.name === 'MongoServerError') {
		if (err.code === 11000) {
			const dupKey = err.errmsg
				.split('index: ')[1]
				.split(' dup key')[0]
				.split('_')[0];
			const dupValue = err.errmsg.split('dup key: ')[1].split('"')[1];
			res
				.status(400)
				.json({ message: `${dupValue} ${dupKey} is already taken.` });
		} else {
			res.status(500).json({ message: err.message || 'Internal server error' });
		}
	} else {
		res
			.status(err.statusCode || 500)
			.json({ message: err.message || 'Internal server error' });
	}
}
