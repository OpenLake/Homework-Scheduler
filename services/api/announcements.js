import CustomError from '../../helpers/api/CustomError';

export const reqCreateAnnouncement = async reqData => {
	const response = await fetch(
		`/api/courses/${reqData.courseId}/announcements/`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reqData),
			credentials: 'include',
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};

export const reqEditAnnouncement = async reqData => {
	const response = await fetch(
		`/api/courses/${reqData.courseId}/announcements/${reqData.announcementId}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reqData),
			credentials: 'include',
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};

export const reqDeleteAnnouncement = async reqData => {
	const response = await fetch(
		`/api/courses/${reqData.courseId}/announcements/${reqData.announcementId}`,
		{
			method: 'DELETE',
			credentials: 'include',
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};
