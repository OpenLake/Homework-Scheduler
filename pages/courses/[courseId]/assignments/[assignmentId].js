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
	const { user } = useContext(authContext);
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
							<Box>
								<Typography variant="h5" fontWeight="300">
									Enroll in this course to submit this assignment by clicking
									the Enroll Button above
								</Typography>
							</Box>
						)}
					</Grid>
				)}
				<Grid item xs={12} mt={2}>
					<Typography variant="h4" fontWeight={2}>
						Discussion
					</Typography>
					<Divider sx={{ mb: 1 }} />
					<AnnouncementInput label="Discuss" onSend={onNewAnnouncement} />
					<Announcements announcements={announcements} alt="No comments yet" />
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
