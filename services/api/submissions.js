import CustomError from '../../helpers/api/CustomError';

export const reqCreateSubmission = async submission => {
	const response = await fetch(
		`/api/course/${submission.courseId}/submissions/new`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(submission),
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new CustomError(data.message);
	}

	return data;
};
