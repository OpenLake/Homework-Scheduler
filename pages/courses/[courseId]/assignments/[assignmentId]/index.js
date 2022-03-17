import { dbConnect } from '../../../../../lib/db';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import useHttp from '../../../../../hooks/useHttp';
import { validateSlugs } from '../../../../../helpers/validateSlugs';

import CourseLayout, { useCourse } from '../../../../../layouts/CourseLayout';
import { Assignment, Submission, Announcement } from '../../../../../models';

import { reqCreateAnnouncement } from '../../../../../services/api/announcements';
import authContext from '../../../../../helpers/auth-context';

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
import { format } from 'date-fns';

import AssignmentDetails from '../../../../../components/Assignment/AssignmentDetails';
import Stats from '../../../../../components/Assignment/Stats';
import NewSubmissionForm from '../../../../../components/Forms/NewSubmission';
import AnnouncementInput from '../../../../../components/Announcements/AnnouncementInput';
import Announcements from '../../../../../components/Announcements/Announcements';
import LoadingSpinner from '../../../../../components/Utils/LoadingSpinner';
import ConfirmationDialog from '../../../../../components/Utils/ConfirmationDialog';

const Index = props => {
	const router = useRouter();
	const assignment = JSON.parse(props.assignment);
	const submissions = JSON.parse(props.submissions);
	const { user, isAuthenticated: auth } = useContext(authContext);
	const { isEnrolled, isTeacher, courseId } = useCourse();
	const { isLoading, sendRequest } = useHttp();

	const [viewFeedback, setViewFeedback] = useState(false);

	const [announcements, setAnnouncements] = useState(
		JSON.parse(props.announcements),
	);

	const [submission, setSubmission] = useState(
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

	const viewSubmissions = () => {
		router.push(
			`/courses/${courseId}/assignments/${assignment._id}/submissions`,
		);
	};

	const discussionDisabled = (!isEnrolled || !auth) && !isTeacher;

	return (
		<Container sx={{ p: 2 }}>
			<ConfirmationDialog
				generalDialog
				open={viewFeedback}
				handleClose={() => setViewFeedback(false)}
				title="Feedback"
				content={submission?.feedback}
			/>
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
						<Button
							variant="contained"
							color="warning"
							sx={{ mt: 2 }}
							onClick={viewSubmissions}
						>
							View Submissions
						</Button>
					</Grid>
				)}
				{!isTeacher && (
					<Grid item xs={12}>
						<Typography variant="h4" fontWeight={2}>
							{!submission ? 'Submit' : 'Your Submission'}
						</Typography>
						<Divider sx={{ mb: 1 }} />
						{isEnrolled && !submission && (
							<NewSubmissionForm
								assignmentId={assignment._id}
								courseId={courseId}
								onSubmit={submission => setSubmission(submission)}
							/>
						)}
						{submission && (
							<Box>
								<Typography variant="body2" color="textSecondary">
									<i>
										Submitted on{' '}
										{format(
											new Date(submission.createdAt || Date.now()),
											"MMM dd, yyyy 'at' hh:mm a",
										)}
									</i>
								</Typography>
								<Typography variant="body2" color="textSecondary">
									<i>
										{submission.status !== 'graded'
											? 'Teacher has not graded your submission yet'
											: `Marks Obtained - ${submission.marks}`}
									</i>
								</Typography>
								<div
									dangerouslySetInnerHTML={{
										__html: submission.content || submission,
									}}
								/>
								{submission.feedback && (
									<Button
										variant="contained"
										color="success"
										onClick={() => setViewFeedback(true)}
									>
										{"View Teacher's Feedback"}
									</Button>
								)}
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
		</Container>
	);
};

Index.Layout = CourseLayout;

export const getServerSideProps = async ctx => {
	if (!validateSlugs(ctx)) {
		return {
			notFound: true,
		};
	}

	await dbConnect();

	const { courseId, assignmentId } = ctx.query;

	const assignment = await Assignment.findOne({
		_id: assignmentId,
		course: courseId,
	}).populate('createdBy');

	if (!assignment) {
		return {
			redirect: {
				permanent: false,
				destination: `/courses/${courseId}/assignments`,
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
