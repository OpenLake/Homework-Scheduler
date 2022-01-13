import { useState } from 'react';
import { useRouter } from 'next/router';
import { dbConnect } from '../../../../lib/db';
import { validateSlugs } from '../../../../helpers/validateSlugs';
import { useCourse } from '../../../../layouts/CourseLayout';
import useHttp from '../../../../hooks/useHttp';
import { Container, Typography, Icon, Box, Stack } from '@mui/material';
import { Announcement } from '../../../../models/';

import { reqCreateAnnouncement } from '../../../../services/api/announcements';
import AnnouncementInput from '../../../../components/Announcements/AnnouncementInput';
import Announcements from '../../../../components/Announcements/Announcements';
import CourseLayout from '../../../../layouts/CourseLayout';
import LoadingSpinner from '../../../../components/Utils/LoadingSpinner';

const Index = props => {
	const { courseId, isEnrolled, isTeacher } = useCourse();
	const router = useRouter();
	const [announcements, setAnnouncements] = useState(
		JSON.parse(props.announcements),
	);
	const { isLoading, sendRequest } = useHttp();

	const onSendAnnouncement = content => {
		const reqData = { courseId, content };

		if (isEnrolled === 'unauthenticated') {
			router.push('/login');
			return;
		}

		sendRequest(reqCreateAnnouncement, reqData, data => {
			setAnnouncements(prev => [data, ...prev]);
		});
	};

	const onDelete = id => {
		setAnnouncements(prev =>
			prev.filter(announcement => announcement._id.toString() !== id),
		);
	};

	const disabled =
		(!isEnrolled || isEnrolled === 'unauthenticated') && !isTeacher;

	return (
		<Container sx={{ my: 4 }}>
			<LoadingSpinner isLoading={isLoading} />
			<Typography variant="h4" gutterBottom>
				Announcements
			</Typography>
			<AnnouncementInput
				label="Announce a new message"
				onSend={onSendAnnouncement}
				disabled={disabled}
				helperText={
					disabled && (
						<Stack
							mt={1}
							direction="row"
							alignItems="center"
							spacing={1}
							component="span"
						>
							<Icon color="info">info</Icon>
							<Typography variant="body2" color="Highlight" component="span">
								You must be enrolled in this course to post announcements.
							</Typography>
						</Stack>
					)
				}
			/>
			<Announcements announcements={announcements} onDelete={onDelete} />
			<Box height="40px" />
		</Container>
	);
};

Index.Layout = CourseLayout;

export const getServerSideProps = async ctx => {
	if (!validateSlugs(ctx)) {
		return {
			notFound: true,
		}
	}
	
	await dbConnect();
	const { courseId } = ctx.query;
	const announcements = await Announcement.find({ course: courseId, type: 'general' })
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
