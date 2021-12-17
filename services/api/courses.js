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
		throw new Error(data.message);
	}

	return data;
};

export const reqJoinCourse = async courseCode => {
	const response = await fetch('/api/courses/join', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ courseCode }),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
};
