/**
 * @description - This Class extends Error class and allows us to set status code in the constructor
 * @param {String} message - Error message to be sent to the client
 * @param {Number} statusCode - Status code to be sent to the client
 * @returns {Object} - Error object
 * @example - throw new CustomError('Error message', 500)
 */
class CustomError extends Error {
	constructor(error, statusCode) {
		super();
		this.message = error;
		this.statusCode = statusCode;
	}
}

export default CustomError;
