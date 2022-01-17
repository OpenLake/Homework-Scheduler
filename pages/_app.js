import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';

import { Stack } from '@mui/material';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import AuthContextProvider from '../components/Utils/AuthContextProvider';

function MyApp({ Component, pageProps }) {
	const Layout = Component.Layout || Fragment;

	return (
		<Fragment>
			<Head>
				<title>Homework Scheduler</title>
			</Head>
			<AuthContextProvider>
				<Stack sx={{ height: '100vh' }}>
					<Header />
					<Layout sx={Layout.sx}>
						<Component {...pageProps} />
					</Layout>
					<Footer />
				</Stack>
			</AuthContextProvider>
		</Fragment>
	);
}

export default MyApp;
