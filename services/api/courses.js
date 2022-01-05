import CustomError from '../../helpers/api/CustomError';

export const reqCreateCourse = async course => {
	const response = await fetch('/api/courses/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(course),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};

export const reqJoinCourse = async courseId => {
	const response = await fetch('/api/courses/join', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ courseId }),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};

export const reqLeaveCourse = async courseId => {
	const response = await fetch('/api/courses/leave', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ courseId }),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};

export const getCourseMembers = async courseId => {
	const response = await fetch(`/api/courses/${courseId}/members`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};

export const getCourseById = async courseId => {
	const response = await fetch(`/api/courses/${courseId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};
