import { Grid, Container, Typography } from '@mui/material';

import CourseCard from './CourseCard';
import Divider from '@mui/material/Divider';

const CourseList = ({ title, courses, onClick }) => {
	return (
		<Container sx={{ my: 5 }}>
			<Typography variant="h5" gutterBottom>
				{title}
				<Divider />
			</Typography>
			<Grid container spacing={3}>
				{courses.map(course => (
					<Grid item key={course._id} xs={12} sm={6} md={4}>
						<CourseCard course={course} onClick={onClick} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default CourseList;
