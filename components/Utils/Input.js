import React, { Fragment, useState } from 'react';

import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const Input = props => {
	const [isError, setIsError] = useState(false);
	const [isTouched, setIsTouched] = useState(false);
	const { onChange, validator, errorText, ...textFieldProps } = props;

	const onChangeHandler = event => {
		let error;
		if (validator) {
			error = props.validator(event.target.value);
			setIsError(!error);
		}
		if (onChange) {
			onChange(props.id, event.target.value, error);
		}
	};

	return (
		<Fragment>
			<TextField
				{...textFieldProps}
				onChange={onChangeHandler}
				onBlur={() => setIsTouched(true)}
				error={isError}
			/>
			<Typography variant="caption" color="error">
				{isError && isTouched && props.errorText}
			</Typography>
		</Fragment>
	);
};

export default Input;
