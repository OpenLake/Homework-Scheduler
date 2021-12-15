import errorhandler from './errorhandler';

export default function (fn) {
	return async (req, res) => {
		try {
			await fn(req, res);
		} catch (err) {
			errorhandler(err, res);
		}
	};
}
