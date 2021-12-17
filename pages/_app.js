import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import AuthContextProvider from '../components/Utils/AuthContextProvider';

function MyApp({ Component, pageProps }) {
	return (
		<Fragment>
			<Head>
				<title>Homework Scheduler</title>
			</Head>
			<AuthContextProvider>
				<Header />
				<Component {...pageProps} />
			</AuthContextProvider>
			<Footer />
		</Fragment>
	);
}

export default MyApp;
