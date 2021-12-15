import mongoose from 'mongoose';
import brcypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 6,
	},
});

userSchema.methods.hashPassword = async function () {
	this.password = await brcypt.hash(this.password, 10);
};

userSchema.methods.comparePassword = function (password) {
	return brcypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
	return token;
};

userSchema.methods.toJSON = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
