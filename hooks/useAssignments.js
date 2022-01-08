import { useState, useEffect, useCallback } from 'react';
import { fetchAssignmentsById } from '../services/api/assignments';

const useAssignments = courseId => {
	const [assignments, setAssignments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [_fetchAgain, setFetchAgain] = useState(false);

	const fetchAgain = useCallback(() => {
		setFetchAgain(true);
	}, []);

	useEffect(() => {
		fetchAssignmentsById(courseId)
			.then(data => {
				setAssignments(data);
				setIsLoading(false);
				setFetchAgain(false);
			})
			.catch(err => {
				console.log(err);
				setIsLoading(false);
				setFetchAgain(false);
			});
	}, [courseId, _fetchAgain]);

	return { assignments, isLoading, fetchAgain };
};

export default useAssignments;
