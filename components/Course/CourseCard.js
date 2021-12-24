import { useState } from 'react';

import { Card, CardContent, Typography } from '@mui/material';

const CourseCard = ({ course }) => {
	const [bgColor, setBgColor] = useState('#fafafa');
	return (
		<Card
			variant="outlined"
			onMouseEnter={() => {
				setBgColor('#ffeeee');
			}}
			onMouseLeave={() => {
				setBgColor('#fafafa');
			}}
			sx={{
				bgcolor: bgColor,
				borderRadius: 2,
				height: '100%',
				maxHeight: '220px',
				cursor: 'pointer',
				transition: 'all 0.1s ease-in-out',
				borderWidth: '1px',
			}}
		>
			<CardContent>
				<Typography variant="h5">{course.name}</Typography>
				<Typography variant="body2" color="textSecondary">
					{course.code}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'normal',
						display: '-webkit-box',
						WebkitLineClamp: '4',
						WebkitBoxOrient: 'vertical',
					}}
				>
					{course.description}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default CourseCard;
