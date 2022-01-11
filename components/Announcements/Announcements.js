import { useState } from 'react';
import { Typography, List } from '@mui/material';
import AnnouncementItem from './AnnouncementItem';

const Announcements = ({ announcements, onDelete, alt }) => {
	return (
		<div>
			<List>
				{announcements.map(announcement => (
					<AnnouncementItem
						key={announcement._id}
						announcement={announcement}
						onDelete={onDelete}
					/>
				))}
			</List>
			{announcements.length === 0 && (
				<Typography variant="h6" fontWeight="400">
					{alt || 'No announcements yet'}
				</Typography>
			)}
		</div>
	);
};

export default Announcements;
