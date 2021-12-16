import React, { useReducer } from 'react';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			const updatedControls = {
				...state.controls,
				[action.name]: { value: action.value, isValid: action.isValid },
			};
			return {
				controls: updatedControls,
				isValid: Object.values(updatedControls).every(
					control => control.isValid,
				),
			};
		default:
			return state;
	}
};

const useForm = (initialState = { controls: {}, isValid: false }) => {
	const [formState, dispatch] = useReducer(formReducer, initialState);

	const onChange = (name, value, isValid) => {
		dispatch({ type: 'CHANGE', name, value, isValid });
	};

	return {
		formState,
		onChange,
	};
};

export default useForm;
