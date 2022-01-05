import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = props => {
	return (
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={props.handleClose}
			aria-describedby="alert-dialog-slide-description"
			fullWidth
		>
			<DialogTitle color="error">{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					{props.content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose}>Ok</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;
