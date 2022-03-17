import { useState } from 'react';
import { TextField, Icon, IconButton, InputAdornment } from '@mui/material';

const AnnouncementInput = ({
	onSend,
	label,
	placeholder,
	helperText,
	disabled,
}) => {
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);

	const onClick = () => {
		if (message.trim().length < 1) {
			setError(true);
			return;
		}

		if (disabled) {
			return;
		}

		onSend && onSend(message);
		setMessage('');
	};

	const onChange = e => {
		setMessage(e.target.value);
		setError(false);
	};

	return (
		<div>
			<TextField
				value={message}
				label={label}
				multiline
				maxRows={4}
				fullWidth
				onKeyDown={e => {
					if (e.key === 'Enter' && e.shiftKey === false) {
						e.preventDefault();
						onClick();
					}
				}}
				onChange={onChange}
				placeholder={placeholder}
				variant="standard"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={onClick}
								disabled={error || disabled}
								color="primary"
							>
								<Icon>send</Icon>
							</IconButton>
						</InputAdornment>
					),
				}}
				error={error}
				helperText={(error && 'Please enter a message') || helperText}
			/>
		</div>
	);
};

export default AnnouncementInput;
