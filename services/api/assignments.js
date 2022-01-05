import CustomError from '../../helpers/api/CustomError';

export const fetchAssignmentsById = async courseId => {
	const response = await fetch(`/api/courses/${courseId}/assignments`);
	const data = await response.json();
	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};

export const reqCreateAssignment = async assignment => {
	const response = await fetch(
		`/api/courses/${assignment.courseId}/assignments/new`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(assignment),
			credentials: 'include',
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};
