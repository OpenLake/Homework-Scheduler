/**
 * @description - This function handles all the errors thrown in any API handler function
 * @param {Error} err - Error object
 * @param {Object} res - Response object
 */
export default function (err, res) {
	if (err.statusCode === 500 || !err.statusCode) {
		console.log(err);
	}

	if (err.name === 'ValidationError') {
		const errors = {};
		for (const key in err.errors) {
			errors[key] = err.errors[key].message;
		}
		err.message = errors;
		err.statusCode = 422;
	} else if (err.name === 'MongoServerError') {
		if (err.code === 11000) {
			const dupKey = err.errmsg
				.split('index: ')[1]
				.split(' dup key')[0]
				.split('_')[0];
			const dupValue = err.errmsg.split('dup key: ')[1].split('"')[1];
			err.message = { [dupKey]: `${dupValue} already exists` };
			err.statusCode = 400;
		}
	}
	res
		.status(err.statusCode || 500)
		.json({ message: err.message || 'Internal server error' });
}
