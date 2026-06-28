/** @format */

const mongoose = require("mongoose");

// defining the data schema
const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		age: {
			type: Number,
		},
	},
	{ timestamps: true },
);

// Export the Model
module.exports = mongoose.model("User", UserSchema);
