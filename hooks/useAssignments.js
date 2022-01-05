import { useState, useEffect, useCallback } from 'react';
import { fetchAssignmentsById } from '../services/api/assignments';

const useAssignments = courseId => {
	const [assignments, setAssignments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!courseId) {
			return;
		}
		fetchAssignmentsById(courseId)
			.then(data => {
				setAssignments(data);
				setIsLoading(false);
			})
			.catch(err => {
				console.log(err);
				setIsLoading(false);
			});
	}, [courseId]);

	return { assignments, isLoading };
};

export default useAssignments;
