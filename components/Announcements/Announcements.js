import { Fragment } from 'react';
import {
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Divider,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const Announcements = ({ announcements, alt }) => {
	return (
		<div>
			<List>
				{announcements.map(announcement => (
					<Fragment key={announcement._id}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								<Avatar>{announcement.user.firstName[0]}</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={
									<Fragment>
										<Typography variant="body1" fontWeight="400" mb={-1}>
											{announcement.user.firstName} {announcement.user.lastName}
										</Typography>
										<Typography variant="caption" color="textSecondary">
											{formatDistanceToNow(new Date(announcement.createdAt), {
												addSuffix: true,
											})}
										</Typography>
									</Fragment>
								}
								secondary={
									<Typography variant="body1">
										{announcement.content}
									</Typography>
								}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
					</Fragment>
				))}
			</List>
			{announcements.length === 0 && (
				<Typography variant="h5">{alt || 'No announcements yet'}</Typography>
			)}
		</div>
	);
};

export default Announcements;
