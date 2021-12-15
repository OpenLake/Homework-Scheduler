import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Home() {
	return (
		<ThemeProvider theme={createTheme()}>
			<Typography variant="h4" align="center">
				Homework scheduler
			</Typography>
		</ThemeProvider>
	);
}
