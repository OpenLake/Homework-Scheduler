import React from 'react';
import isAuth from '../middlewares/isAuth';
import webRoutes from '../helpers/webRoutes';
import SignUp from '../components/Forms/SignUp';

const signup = () => {
	return <SignUp />;
};

export const getServerSideProps = isAuth(async ctx => {
	return {
		props: {},
	};
}, webRoutes.signup);

export default signup;
