const { Request }  = require('../models/request.model');
const { User, userRoles } = require('../models/user.model');

const get = async (page, limit, filter, sort) => {
	const requests = await Request.find(filter)
		.select('requester title location status priority')
		.populate('location')
		.populate('requester', 'name avatar')
		.skip((page - 1) * limit)
		.limit(limit)
		.sort(sort);
	
	const total = await Request.countDocuments(filter);

	return {
		success: true,
		message: 'Requests retrived',
		data: {
			requests,
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
	const request = await Request.findById(id)
		.populate('requester', 'name role avatar phone email')
		.populate('location');
	if (!request) {
		const error = new Error("Request not found");
		error.statusCode = 404;
		throw error;
	}

	return {
		success: true,
		message: "Request retrived",
		data: {
			request
		}
	}
}

const create = async (userId, data) => {
	data.requester = userId;
	const request = new Request(data);

	await request.save();

	return {
		success: true,
		message: 'Request created successfully',
		data: {
			request
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

	const request = await Request.findById(id);
	
	if (!request) {
		const error = new Error("Request not found");
		error.statusCode = 404;
		throw error;
	}
	const userIsRequesterOrAdmin = request.requester.equals(userId) || user.role === userRoles.values.ADMIN;

	if (!userIsRequesterOrAdmin) {
		const error = new Error('Unauthorzied actioin');
		error.statusCode = 403;
		throw error;
	}

	const updatedRecord = await Request.findByIdAndUpdate(id, data, 
		{
			returnDocument: 'after',
			runValidators: true
		}
	);


	return {
		success: true,
		message: 'Request updated successfully',
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

	const request = await Request.findById(id);
	
	if (!request) {
		const error = new Error("Request not found");
		error.statusCode = 404;
		throw error;
	}
	const userIsRequesterOrAdmin = request.maintainer.equals(userId) || user.role === userRoles.values.ADMIN;

	if (!userIsRequesterOrAdmin) {
		const error = new Error('Unauthorzied actioin');
		error.statusCode = 403;
		throw error;
	}

	await request.deleteOne();

	return {
		success: true,
		message: 'Deleted request successfully',
		data: { request }
	}
}

module.exports = {
	get,
	getById,
	create,
	updateById,
	deleteById
}