import { Button, Icon } from '@mui/material';
import { useRouter } from 'next/router';

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

export default BackButton;
