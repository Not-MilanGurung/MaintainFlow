const {Schema, model} = require('mongoose');

const priorityEnum = ['LOW', 'MEDIUM', 'HIGH'];
const statusEnum = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

const requestSchema = new Schema(
    {
        requester: {type: Schema.Types.ObjectId, ref: 'User'},
        maintainenceRecord: {type: Schema.Types.ObjectId, ref: 'MaintainenceRecord'},

        title: {type: String, required: true},
        description: {type: String, required: true},

        status: {type: String, enum: statusEnum, default: 'PENDING'},
        priority: {type: String, enum: priorityEnum, default: 'LOW'}
    },
    {
        timestamps: true
    }
);

const Request = model('Request', requestSchema);

module.exports = {Request, priorityEnum, statusEnum};