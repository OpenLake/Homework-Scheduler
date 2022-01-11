import { useState } from 'react';
import { useCourse } from '../../../../layouts/CourseLayout';
import useHttp from '../../../../hooks/useHttp';
import { Container, Typography } from '@mui/material';
import { Announcement } from '../../../../models/';

import { reqCreateAnnouncement } from '../../../../services/api/announcements';
import AnnouncementInput from '../../../../components/Announcements/AnnouncementInput';
import Announcements from '../../../../components/Announcements/Announcements';
import CourseLayout from '../../../../layouts/CourseLayout';
import LoadingSpinner from '../../../../components/Utils/LoadingSpinner';

const Index = props => {
	const { courseId } = useCourse();
	const [announcements, setAnnouncements] = useState(
		JSON.parse(props.announcements),
	);
	const { isLoading, sendRequest } = useHttp();

	const onSendAnnouncement = content => {
		const reqData = { courseId, content };
		sendRequest(reqCreateAnnouncement, reqData, data => {
			setAnnouncements(prev => [data, ...prev]);
		});
	};

	return (
		<Container sx={{ my: 4 }}>
			<LoadingSpinner isLoading={isLoading} />
			<Typography variant="h4" gutterBottom>
				Announcements
			</Typography>
			<AnnouncementInput
				label="Announce a new message"
				onSend={onSendAnnouncement}
			/>
			<Announcements announcements={announcements} />
		</Container>
	);
};

Index.Layout = CourseLayout;

export const getServerSideProps = async ctx => {
	const { courseId } = ctx.query;
	const announcements = await Announcement.find({ courseId, type: 'general' })
		.sort({ createdAt: -1 })
		.populate('user', {
			_id: 1,
			firstName: 1,
			lastName: 1,
		});

	return {
		props: {
			announcements: JSON.stringify(announcements),
		},
	};
};

export default Index;
