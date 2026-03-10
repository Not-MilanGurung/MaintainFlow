const {v4 : uuidv4} = require('uuid');
const storage = require('../data/storage');
const statues = require('../data/statuses');

const getAllRequests = () => {
	return storage.requests;
}

const getRequestById = (id) => {
	const requests = storage.requests;
	return requests.find((request) => request.id === id);
}

const createRequest = ({
	requesterId,
	title,
	description,
	priority,
	location
}) => {
	const request = {
		id: uuidv4(),
		requesterId,
		maintainerId: null,
		maintainenceRecordId: null,
		createdAt: new Date().toISOString(),
		completedAt: null,
		title,
		description,
		location,
		priority,
		status: statues.values.CREATED,
	};
	
	storage.requests.push(request);
	return request;
}

const deleteRequestById = (id) => {
	let deletedRequest = null
	storage.requests = storage.requests.filter((request) => {
		if (request.id === id){
			deletedRequest = request;
			return false;
		}
		return true;
	});
	return deletedRequest;
}

const updateRequest = ({
	id,
	maintainerId,
	maintainenceRecordId,
	completedAt,
	title,
	description,
	location,
	priority,
	status
}) => {
	let updatedRequest = null;
	storage.requests = storage.requests.map(request => {
		if(request.id === id){
			if (maintainerId) request.maintainerId = maintainerId;
			if (maintainenceRecordId) request.maintainenceRecordId = maintainenceRecordId;
			if (completedAt) request.completedAt = completedAt;
			if (title) request.title = title;
			if (description) request.description = description;
			if (location) request.location = location;
			if (priority != null) request.priority = priority;
			if (status) request.status = status;
			updatedRequest = request;
		}
		return request;
	});

	return updatedRequest;
}

module.exports = {
	getAllRequests,
	getRequestById,
	createRequest,
	deleteRequestById,
	updateRequest
}