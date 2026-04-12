const MaintainenceRecord = require('../models/maintainence-record.model');
const { User, userRoles } = require('../models/user.model');

const get = async (page, limit, filter, sort) => {
	const maintainenceRecords = await MaintainenceRecord.find(filter)
		.select('maintainer request status completedAt')
		.populate('maintainer', 'name avatar')
		.populate('request', 'title')
		.skip((page - 1) * limit)
		.limit(limit)
		.sort(sort);
	
	const total = await MaintainenceRecord.countDocuments(filter);

	return {
		success: true,
		message: 'MaintainenceRecords retrived',
		data: {
			maintainenceRecords,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total/limit)
			}
		}
	}
}

const getById = async (id) => {
	const maintainenceRecord = await MaintainenceRecord.findById(id)
		.populate('maintainer', 'name role avatar phone email')
		.populate('request', 'title status priority');
	if (!maintainenceRecord) {
		const error = new Error("MaintainenceRecord not found");
		error.statusCode = 404;
		throw error;
	}

	return {
		success: true,
		message: "MaintainenceRecord retrived",
		data: {
			maintainenceRecord
		}
	}
}

const create = async (userId, data) => {
	data.maintainer = userId;
	const maintainenceRecord = new MaintainenceRecord(data);

	await maintainenceRecord.save();

	return {
		success: true,
		message: 'MaintainenceRecord created successfully',
		data: {
			maintainenceRecord
		}
	}
}

const updateById = async (id, userId, data) => {
	const user = await User.findById(userId);
	if (!user) {
		const error = new Error('User not found');
		error.statusCode = 404;
		throw error;
	}

	const maintainenceRecord = await MaintainenceRecord.findById(id);
	
	const userIsMaintainerOrAdmin = maintainenceRecord.maintainer.equals(userId) || user.role === userRoles.values.ADMIN;
	if (!maintainenceRecord) {
		const error = new Error("MaintainenceRecord not found");
		error.statusCode = 404;
		throw error;
	}

	if (!userIsMaintainerOrAdmin) {
		const error = new Error('Unauthorzied actioin');
		error.statusCode = 403;
		throw error;
	}

	const updatedRecord = await MaintainenceRecord.findByIdAndUpdate(id, data, 
		{
			returnDocument: 'after',
			runValidators: true
		}
	);


	return {
		success: true,
		message: 'MaintainenceRecord updated successfully',
		data: { updatedRecord }
	}
}

const deleteById = async (id, userId) => {
	const user = await User.findById(userId);
	if (!user) {
		const error = new Error('User not found');
		error.statusCode = 404;
		throw error;
	}

	const maintainenceRecord = await MaintainenceRecord.findById(id);
	
	const userIsMaintainerOrAdmin = maintainenceRecord.maintainer.equals(userId) || user.role === userRoles.values.ADMIN;
	if (!maintainenceRecord) {
		const error = new Error("MaintainenceRecord not found");
		error.statusCode = 404;
		throw error;
	}

	if (!userIsMaintainerOrAdmin) {
		const error = new Error('Unauthorzied actioin');
		error.statusCode = 403;
		throw error;
	}

	await maintainenceRecord.deleteOne();

	return {
		success: true,
		message: 'Deleted maintainenceRecord successfully',
		data: { maintainenceRecord }
	}
}

module.exports = {
	get,
	getById,
	create,
	updateById,
	deleteById
}