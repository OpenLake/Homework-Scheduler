import { useContext, useState } from 'react';
import useHttp from '../../../../hooks/useHttp';
import CourseLayout, { useCourse } from '../../../../layouts/CourseLayout';
import { Assignment, Submission, Announcement } from '../../../../models';

import { reqCreateAnnouncement } from '../../../../services/api/announcements';
import authContext from '../../../../helpers/auth-context';

import {
	Container,
	Grid,
	Button,
	Box,
	Typography,
	Divider,
	Stack,
	Icon,
} from '@mui/material';

import AssignmentDetails from '../../../../components/Assignment/AssignmentDetails';
import Stats from '../../../../components/Assignment/Stats';
import NewSubmissionForm from '../../../../components/Forms/NewSubmission';
import AnnouncementInput from '../../../../components/Announcements/AnnouncementInput';
import Announcements from '../../../../components/Announcements/Announcements';
import LoadingSpinner from '../../../../components/Utils/LoadingSpinner';

const Index = props => {
	const assignment = JSON.parse(props.assignment);
	const submissions = JSON.parse(props.submissions);
	const { user, isAuthenticated: auth } = useContext(authContext);
	const { isEnrolled, isTeacher, courseId } = useCourse();
	const { isLoading, sendRequest } = useHttp();

	const [announcements, setAnnouncements] = useState(
		JSON.parse(props.announcements),
	);
	const [isSubmitted, setIsSubmitted] = useState(
		submissions.find(submission => submission.submittedBy === user?._id),
	);

	const onNewAnnouncement = content => {
		const reqData = {
			content,
			courseId,
			assignmentId: assignment._id,
			type: 'assignment',
		};
		sendRequest(reqCreateAnnouncement, reqData, data => {
			setAnnouncements([data, ...announcements]);
		});
	};

	const onDelete = id => {
		setAnnouncements(prev =>
			prev.filter(announcement => announcement._id.toString() !== id),
		);
	};

	const discussionDisabled = (!isEnrolled || !auth) && !isTeacher;

	return (
		<Container sx={{ p: 2 }}>
			<LoadingSpinner isLoading={isLoading} />
			<Grid container rowSpacing={3}>
				<Grid item xs={12}>
					<AssignmentDetails assignment={assignment} />
				</Grid>
				{isTeacher && (
					<Grid item xs={12}>
						<Stats
							submissions={submissions.length}
							assignedTo={assignment.assignedTo.length}
						/>
						<Button variant="contained" color="warning" sx={{ mt: 2 }}>
							View Submissions
						</Button>
					</Grid>
				)}
				{!isTeacher && (
					<Grid item xs={12}>
						<Typography variant="h4" fontWeight={2}>
							Submit
						</Typography>
						<Divider sx={{ mb: 1 }} />
						{isEnrolled && !isSubmitted && (
							<NewSubmissionForm
								assignmentId={assignment._id}
								courseId={courseId}
								onSubmit={() => setIsSubmitted(true)}
							/>
						)}
						{isSubmitted && (
							<Box>
								<Typography variant="h5" fontWeight="300">
									You have already submitted this assignment.
								</Typography>
								<Button variant="contained" color="primary" sx={{ mt: 2 }}>
									View Submission
								</Button>
							</Box>
						)}
						{!isEnrolled && (
							<Stack mt={1} direction="row" alignItems="center" spacing={1}>
								<Icon color="info">info</Icon>
								<Typography variant="body2" color="Highlight">
									You must be enrolled in this course to submit this assignment.
								</Typography>
							</Stack>
						)}
					</Grid>
				)}
				<Grid item xs={12} mt={2}>
					<Typography variant="h4" fontWeight={2}>
						Discussion
					</Typography>
					<Divider sx={{ mb: 1 }} />
					<AnnouncementInput
						label="Discuss"
						onSend={onNewAnnouncement}
						disabled={discussionDisabled}
						helperText={
							discussionDisabled && (
								<Stack
									mt={1}
									direction="row"
									alignItems="center"
									spacing={1}
									component="span"
								>
									<Icon color="info">info</Icon>
									<Typography
										variant="body2"
										color="Highlight"
										component="span"
									>
										You must be enrolled in this course to post announcements.
									</Typography>
								</Stack>
							)
						}
					/>
					<Announcements
						announcements={announcements}
						alt="No comments yet"
						onDelete={onDelete}
					/>
				</Grid>
			</Grid>
			<Box height="50px" />
		</Container>
	);
};

Index.Layout = CourseLayout;

export const getServerSideProps = async ctx => {
	const { courseId, assignmentId } = ctx.query;

	const assignment = await Assignment.findOne({
		_id: assignmentId,
		course: courseId,
	}).populate('createdBy');

	if (!assignment) {
		return {
			redirect: {
				status: 302,
				url: `/courses/${courseId}/assignments`,
			},
		};
	}

	const submissions = await Submission.find({
		assignment: assignmentId,
		course: courseId,
	});

	const announcements = await Announcement.find({
		course: courseId,
		assignment: assignmentId,
	})
		.sort({ createdAt: -1 })
		.populate('user');

	return {
		props: {
			assignment: JSON.stringify(assignment),
			submissions: JSON.stringify(submissions),
			announcements: JSON.stringify(announcements),
		},
	};
};

export default Index;
