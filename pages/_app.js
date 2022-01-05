import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';

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
				<Header />
				<Layout>
					<Component {...pageProps} />
				</Layout>
				<Footer />
			</AuthContextProvider>
		</Fragment>
	);
}

export default MyApp;
