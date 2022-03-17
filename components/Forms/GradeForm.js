import { useForm, Controller } from 'react-hook-form';
import { useCourse } from '../../layouts/CourseLayout';
import useHttp from '../../hooks/useHttp';
import { reqGradeSubmission } from '../../services/api/submissions';

import {
	TextField,
	Stack,
	InputAdornment,
	Button,
	Typography,
} from '@mui/material';
import LoadingSpinner from '../Utils/LoadingSpinner';

const GradeForm = ({ maxMarks, submissionId, onlyFeedback, handleGrade }) => {
	const { isLoading, sendRequest } = useHttp();
	const { courseId } = useCourse();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = formData => {
		const reqData = { ...formData, submissionId, courseId };

		sendRequest(reqGradeSubmission, reqData, () => {
			handleGrade(formData);
		});
	};

	return (
		<Stack
			spacing={2}
			component="form"
			noValidate
			mt={2}
			onSubmit={handleSubmit(onSubmit)}
		>
			{onlyFeedback && <Typography variant="h6">Give Feedback</Typography>}
			<LoadingSpinner isLoading={isLoading} />
			{!onlyFeedback && (
				<Controller
					control={control}
					name="marks"
					rules={{
						required: 'Marks are required',
						min: {
							value: 0,
							message: 'Marks cannot be negative',
						},
						max: {
							value: maxMarks,
							message: 'Cannot give more marks than maximum marks',
						},
					}}
					defaultValue={0}
					render={({ field }) => (
						<TextField
							label="Marks"
							type="number"
							variant="outlined"
							required
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">/{maxMarks}</InputAdornment>
								),
							}}
							{...field}
							error={!!errors.marks}
							helperText={errors.marks && errors.marks.message}
						/>
					)}
				/>
			)}
			<Controller
				control={control}
				name="feedback"
				rules={{ required: onlyFeedback ? 'Feedback is required' : false }}
				defaultValue=""
				render={({ field }) => (
					<TextField
						label="Feedback"
						variant="outlined"
						fullWidth
						required={onlyFeedback}
						placeholder="Optional"
						multiline
						minRows={2}
						{...field}
						error={!!errors.feedback}
						helperText={errors.feedback && errors.feedback.message}
					/>
				)}
			/>
			<Button
				type="submit"
				variant="contained"
				color="success"
				sx={{ width: '100px' }}
				disabled={!!errors.marks}
			>
				Submit
			</Button>
		</Stack>
	);
};

export default GradeForm;
