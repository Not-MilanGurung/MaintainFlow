const statuses = {
	values:	Object.freeze({
		CREATED: "created",
		INPROGRESS: "inprogress",
		COMPLETED: "completed",
		CANCELED: "canceled"
	}),
	isValid(val) {
		return Object.values(this.values).includes(val)
	}
}

module.exports = statuses;