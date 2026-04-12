const mongoose = require('mongoose');
const { statusEnum } = require('./request.model');

const maintainenceRecordSchema = new mongoose.Schema(
	{
		maintainer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, "Maintainer id is required"]
		},
		request: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Request',
			required: [true, "Request id is required"]
		},
		completedAt: {
			type: Date,
		},
		status: {
			type: String,
			enum: Object.values(statusEnum.values),
			default: statusEnum.values.REQUESTED
		},
		description: {
			type: String,
			required: [true, "Description is required"]
		}
	},
	{
		timestamps: true
	}
)

const MaintainenceRecord = mongoose.model('MaintainenceRecord', maintainenceRecordSchema);

module.exports = MaintainenceRecord;