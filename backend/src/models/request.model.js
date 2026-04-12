const mongoose = require('mongoose');

const priorityEnum = Object.freeze({
	values: {
		HIGH: 'high',
		MEDIUM: 'medium',
		LOW: 'low',
	},

	isValid(value) {
		return Object.values(this.values).includes(value);
	},	
});

const statusEnum = Object.freeze({
	values: {
		COMPLETED: 'completed',
		CANCELLED: 'cancelled',
		ONGOING: 'ongoing',
		REQUESTED: 'requested'
	},

	isValid(value) {
		return Object.values(this.values).includes(value);
	},	
});

const requestSchema = new mongoose.Schema(
	{
		requester: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		maintainenceRecord: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'MaintainenceRecord',
		},
		completedAt: {
			type: Date,
		},
		title: {
			type: String,
			required: [true, "Title is required"],
			maxlength: [100, "Title can not be more than 100 charcters"]
		},
		description: {
			type: String,
			required: [true, "Description is required"]
		},
		priority: {
			type: String,
			enum: Object.values(priorityEnum.values),
			default: priorityEnum.values.LOW
		},
		status: {
			type: String,
			enum: Object.values(statusEnum.values),
			default: statusEnum.values.REQUESTED
		},
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Location',
			required: [true, "Location is required"]
		}
	},
	{
		timestamps: true
	}
);

const Request = mongoose.model('Request', requestSchema);

module.exports = {
	priorityEnum,
	statusEnum,
	Request
}