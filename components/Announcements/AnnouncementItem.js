import { Fragment, useContext, useState } from 'react';
import { useCourse } from '../../layouts/CourseLayout';
import useHttp from '../../hooks/useHttp';

import {
	reqEditAnnouncement,
	reqDeleteAnnouncement,
} from '../../services/api/announcements';

import {
	Avatar,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	IconButton,
	Icon,
	Menu,
	MenuItem,
	TextField,
} from '@mui/material';

import authContext from '../../helpers/auth-context';
import LoadingSpinner from '../Utils/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';

const AnnouncementItem = ({ announcement, onDelete }) => {
	const { isLoading, sendRequest } = useHttp();
	const { isTeacher, courseId } = useCourse();
	const [anchor, setAnchor] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState(announcement.content);
	const open = Boolean(anchor);
	const { user } = useContext(authContext);
	const author = announcement.user._id === user?._id;

	const onEdit = () => {
		setAnchor(null);
		setIsEditing(true);
	};

	const editAnnouncement = () => {
		if (content.trim().length === 0) {
			return;
		}
		const reqData = {
			courseId,
			announcementId: announcement._id,
			content,
		};
		sendRequest(reqEditAnnouncement, reqData, () => {
			setAnchor(null);
			setIsEditing(false);
		});
	};

	const deleteAnnouncement = () => {
		const reqData = {
			courseId,
			announcementId: announcement._id,
		};

		sendRequest(reqDeleteAnnouncement, reqData, data => {
			setAnchor(null);
			onDelete(data._id.toString());
		});
	};

	return (
		<Fragment>
			<LoadingSpinner isLoading={isLoading} />
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
						!isEditing && <Typography variant="body1">{content}</Typography>
					}
				/>
				{isEditing && (
					<TextField
						fullWidth
						multiline
						value={content}
						onKeyDown={e => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();
								editAnnouncement();
							}
						}}
						onChange={e => setContent(e.target.value)}
						error={content.trim().length === 0}
					/>
				)}
				{(isTeacher || author) && (
					<IconButton onClick={e => setAnchor(e.currentTarget)}>
						<Icon>more_vert</Icon>
					</IconButton>
				)}
			</ListItem>
			<Menu open={open} anchorEl={anchor} onClose={() => setAnchor(null)}>
				{author && (
					<MenuItem onClick={onEdit}>
						<Icon sx={{ mr: 1 }} color="info">
							edit
						</Icon>{' '}
						Edit
					</MenuItem>
				)}
				<MenuItem onClick={deleteAnnouncement}>
					<Icon sx={{ mr: 1 }} color="error">
						delete
					</Icon>
					Delete
				</MenuItem>
			</Menu>
			<Divider variant="inset" component="li" />
		</Fragment>
	);
};

export default AnnouncementItem;
