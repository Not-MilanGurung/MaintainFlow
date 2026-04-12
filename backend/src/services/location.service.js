const Location = require('../models/location.model');

const get = async (page, limit, filter, sort) => {
	const locations = await Location.find(filter)
		.skip((page - 1) * limit)
		.limit(limit)
		.sort(sort);
	
	const total = await Location.countDocuments(filter);

	return {
		success: true,
		message: 'Locations retrived',
		data: {
			locations,
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
	const location = await Location.findById(id);
	if (!location) {
		const error = new Error("Location not found");
		error.statusCode = 404;
		throw error;
	}

	return {
		success: true,
		message: "Location retrived",
		data: {
			location
		}
	}
}

const create = async (data) => {
	const location = new Location(data);
	await location.save();

	return {
		success: true,
		message: 'Location created successfully',
		data: {
			location
		}
	}
}

const updateById = async (id, data) => {
	const location = await Location.findByIdAndUpdate(id, data, 
		{
			returnDocument: 'after',
			runValidators: true
		}
	);

	if (!location) {
		const error = new Error("Location not found");
		error.statusCode = 404;
		throw error;
	}

	return {
		success: true,
		message: 'Location updated successfully',
		data: { location }
	}
}

const deleteById = async (id) => {
	const location = await Location.findByIdAndDelete(id);
	
	if (!location) {
		const error = new Error("Location not found");
		error.statusCode = 404;
		throw error;
	}

	return {
		success: true,
		message: 'Deleted location successfully',
		data: { location }
	}
}

module.exports = {
	get,
	getById,
	create,
	updateById,
	deleteById
}