import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Divider } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({
	open,
	handleClose,
	handleConfirm,
	title,
	content,
	generalDialog = false,
}) => {
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				fullWidth
			>
				<DialogTitle>{title}</DialogTitle>
				<Divider variant="middle" />
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{content}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{!generalDialog && <Button onClick={handleClose}>No</Button>}
					{!generalDialog && <Button onClick={handleConfirm}>Confirm</Button>}
					{generalDialog && <Button onClick={handleClose}>Close</Button>}
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ConfirmationDialog;
