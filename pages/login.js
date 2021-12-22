import React from 'react';
import isAuth from '../middlewares/isAuth';
import webRoutes from '../helpers/webRoutes';
import LogIn from '../components/Forms/LogIn';

const login = () => {
	return <LogIn />;
};

export const getServerSideProps = isAuth(async ctx => {
	return {
		props: {},
	};
}, webRoutes.login);

export default login;
