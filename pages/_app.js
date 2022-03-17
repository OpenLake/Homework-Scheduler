import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';

import { Stack, LinearProgress } from '@mui/material';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import AuthContextProvider from '../components/Utils/AuthContextProvider';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const Layout = Component.Layout || Fragment;
	const LayoutProps = Component.LayoutProps || {};

	useEffect(() => {
		const handleChangeStart = () => setLoading(true);
		const handleChangeComplete = () => setLoading(false);

		router.events.on('routeChangeStart', handleChangeStart);
		router.events.on('routeChangeComplete', handleChangeComplete);

		return () => {
			router.events.off('routeChangeStart', handleChangeStart);
			router.events.off('routeChangeComplete', handleChangeComplete);
		};
	}, [router]);

	return (
		<Fragment>
			<Head>
				<title>Homework Scheduler</title>
			</Head>
			<AuthContextProvider>
				<Stack sx={{ height: '100vh' }}>
					{loading && <LinearProgress />}
					<Header />
					<Layout {...LayoutProps}>
						<Component {...pageProps} />
					</Layout>
					<Footer />
				</Stack>
			</AuthContextProvider>
		</Fragment>
	);
}

export default MyApp;
