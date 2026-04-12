const requestServices = require('../services/request.service');

const getRequests = async (req, res) => {
	const { page = 1, limit = 25, filter, sort = { createdAt: 1 } } = req.query;

	const result = await requestServices.get(page, limit, filter, sort);
	res.status(200).json(result);
}

const getRequestById = async (req, res) => {
	const { id } = req.params;
	const result = await requestServices.getById(id);
	res.status(200).json(result);
}

const createRequest = async (req, res) => {
	const userId = req.user.id;
	const data = req.body;
	if (!data) {
		const error = new Error('No body provided');
		error.statusCode = 400;
		throw error;
	}

	const result = await requestServices.create(userId, data);
	res.status(201).json(result);
}

const updateRequest = async (req, res) => {
	const {id} = req.params;
	const userId = req.user.id;
	const data = req.body;
	if (!data) {
		const error = new Error('No body provided');
		error.statusCode = 400;
		throw error;
	}

	const result = await requestServices.updateById(id, userId, data);
	res.status(200).json(result);
}

const deleteRequest = async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;

	const result = await requestServices.deleteById(id, userId);
	res.status(200).json(result);
}

module.exports = {
	getRequests,
	getRequestById,
	createRequest,
	updateRequest,
	deleteRequest
}