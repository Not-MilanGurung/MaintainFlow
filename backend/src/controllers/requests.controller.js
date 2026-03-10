const requestsService = require('../services/requests.service');
const statuses = require('../data/statuses');
const validPriority = (priority) => priority > 0 && priority < 11

const getAllRequests = (req, res) => {
	const requests = requestsService.getAllRequests();
	res.status(200).json(requests);
}

const getRequestById = (req, res) => {
	const id = req.params.id;
	const request = requestsService.getRequestById(id);
	if (!request){
		return res.status(404).json({ error: "Request not found"});
	}
	res.status(200).json(request);
}

const createRequest = (req, res) => {
	const {
		requesterId,
		title,
		description,
		priority,
		location
	} = req.body;

	if (!requesterId || !title || !description || priority == null || !location){
		return res.status(400).json({ error: "Insuffecient fields"});
	}
	if (!validPriority(priority)){
		return res.status(400).json({ error: "Priority must be between 1 and 10"});
	}
	const request = requestsService.createRequest({
		requesterId,
		title,
		description,
		priority,
		location
	});
	res.status(201).json(request);
}

const deletedRequest = (req, res) => {
	const id = req.params.id;
	const request = requestsService.deleteRequestById(id);
	if (!request){
		return res.status(404).json({ error: "Request not found"});
	}
	res.status(200).json(request);
}

const updateRequest = (req, res) => {
	const id = req.params.id;
	const {
		maintainerId,
		maintainenceRecordId,
		completedAt,
		title,
		description,
		location,
		priority,
		status
	}	= req.body;

	if (!maintainerId &&
		!maintainenceRecordId &&
		!completedAt &&
		!title &&
		!description &&
		!location &&
		!priority &&
		!status) {
			return res.status(400).json({ error: "One updated field is required"});
		}
	
	if (priority != null && !validPriority(priority)){
		return res.status(400).json({ error: "Priority must be between 1 and 10"});
	}
	if (status && !statuses.isValid(status)) {
		return res.status(400).json({ error: "Not a valid status"});
	}

	const request = requestsService.updateRequest({
		id,
		maintainerId,
		maintainenceRecordId,
		completedAt,
		title,
		description,
		location,
		priority,
		status
	});
	if (!request) {
		return res.status(404).json({ error: "Request not found"});
	}
	res.status(200).json(request);
}

module.exports = {
	getAllRequests,
	getRequestById,
	createRequest,
	deletedRequest,
	updateRequest
}