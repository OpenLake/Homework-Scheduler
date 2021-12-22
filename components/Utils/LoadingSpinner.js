import { Backdrop, CircularProgress } from '@mui/material';

const LoadingSpinner = props => {
	return (
		<Backdrop open={props.isLoading} sx={{ zIndex: '100' }}>
			<CircularProgress style={{ color: '#cecece' }} />
		</Backdrop>
	);
};

export default LoadingSpinner;
