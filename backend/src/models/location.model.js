const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
	{
		building: {
			type: String,
			required: [true, "Building is required"],
			maxlength: [100, "Building can not be more than 100 characters"]
		},
		floor: {
			type: String,
			required: [true, "Floor is required"],
			maxlength: [5, "Floor can not be more than 5 characters"]
		},
		room: {
			type: String,
			required: [true, "Room is required"],
			maxlength: [50, "Room can not be more than 50 characters"]
		},
	},
	{
		timestamps: true
	}
);

locationSchema.index({ building: 1, floor: 1, room: 1 }, { unique: true });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;