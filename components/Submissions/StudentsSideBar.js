import {
	Slide,
	List,
	ListItem,
	Avatar,
	ListItemText,
	ListItemAvatar,
	ListItemIcon,
	Icon,
	Divider,
	Backdrop,
	Typography,
} from '@mui/material';

const StudentsSideBar = ({
	students,
	open,
	mobile,
	handleClick,
	submissions,
}) => {
	return (
		<>
			<Backdrop open={open && mobile} onClick={() => handleClick('backdrop')} />
			<Slide direction="up" in={open || !mobile} mountOnEnter unmountOnExit>
				<List
					component="nav"
					sx={{
						position: mobile ? 'absolute' : 'relative',
						height: mobile ? '100%' : 'auto',
						bgcolor: 'white',
						width: '100%',
						borderRadius: '0.5rem 0.5rem 0rem 0rem',
					}}
				>
					<ListItem
						button
						key="instructions"
						onClick={() => handleClick('instructions')}
					>
						<ListItemIcon>
							<Icon>info</Icon>
						</ListItemIcon>
						<ListItemText primary="Instructions" />
					</ListItem>
					<Divider variant="middle" />
					{students.map(student => (
						<ListItem
							button
							key={student._id}
							onClick={() => handleClick(student._id)}
						>
							<ListItemAvatar>
								<Avatar>{student.firstName[0]}</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={`${student.firstName} ${student.lastName}`}
								secondary={
									submissions.find(
										s => s.submittedBy.toString() === student._id.toString(),
									) ? (
										<Typography variant="caption" color="green">
											Submitted
										</Typography>
									) : (
										<Typography variant="caption" color="error">
											Not Submitted
										</Typography>
									)
								}
							/>
						</ListItem>
					))}
				</List>
			</Slide>
		</>
	);
};

export default StudentsSideBar;
