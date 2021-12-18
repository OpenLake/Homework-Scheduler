import errorhandler from './errorhandler';

/**
 * @description - This function is used to catch errors and send them to the errorhandler
 * @param {Function} fn - API Handler function to be wrapped
 * @returns {Function} - Wrapped API Handler function
 */
export default function (fn) {
	return async (req, res) => {
		try {
			await fn(req, res);
		} catch (err) {
			errorhandler(err, res);
		}
	};
}
