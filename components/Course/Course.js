import { useState } from 'react';
import {
	Container,
	Tabs,
	Tab,
	Icon,
	Stack,
	Typography,
	Button,
	Box,
} from '@mui/material';
import { useRouter } from 'next/router';

import People from './People';

const BackButton = () => {
	const router = useRouter();

	const goBack = () => {
		router.back();
	};

	return (
		<Button onClick={goBack}>
			<Icon>arrow_back</Icon>
		</Button>
	);
};

const Course = ({ course }) => {
	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	return (
		<Container>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Stack direction="row">
					<BackButton />
					<Stack mt={2}>
						<Typography variant="h5">{course.name}</Typography>
						<Typography variant="subtitle1" color="GrayText">
							{course.code}
						</Typography>
					</Stack>
				</Stack>
				<Tabs value={activeTab} onChange={handleChange} centered>
					<Tab label="Assignments" icon={<Icon>assignment</Icon>} />
					<Tab label="People" icon={<Icon>people</Icon>} />
				</Tabs>
			</Stack>
			{activeTab === 1 && (
				<People students={course.students} teachers={[course.creator]} />
			)}
			<Box height="10px" />
		</Container>
	);
};

export default Course;
