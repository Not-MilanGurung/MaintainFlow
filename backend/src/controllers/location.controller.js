const locationService = require('../services/location.service');

const getLocations = async (req, res) => {
	const { page = 1, limit = 25, 
		sort = { building: 1 }, filter} = req.query;

	const result = await locationService.get(page, limit, filter, sort);
	res.status(200).json(result);
}

const getLocationById = async (req, res) => {
	const { id } = req.params;
	const result = await locationService.getById(id);
	res.status(200).json(result);
}

const registerLocation = async (req, res) => {
	const data = req.body;
	if (!data) {
		const error = new Error('No body recivied');
		error.statusCode = 400;
		throw error;
	}

	const result = await locationService.create(data);
	res.status(201).json(result);
} 

const editLocation = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	if (!data) {
		const error = new Error('No body recivied');
		error.statusCode = 400;
		throw error;
	}

	const result = await locationService.updateById(id, data);
	res.status(200).json(result);
}

const deleteLocation = async (req, res) => {
	const { id } = req.params;
	const result = await locationService.deleteById(id);
	res.status(200).json(result);
}

module.exports = {
	getLocations,
	getLocationById,
	registerLocation,
	editLocation,
	deleteLocation
}