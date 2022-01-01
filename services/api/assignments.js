export const fetchAssignmentsById = async courseId => {
	const response = await fetch(`/api/courses/${courseId}/assignments`);
	const data = await response.json();
	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};
