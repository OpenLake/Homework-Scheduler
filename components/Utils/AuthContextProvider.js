import React, { useState, useEffect, useCallback } from 'react';

import authContext from '../../helpers/auth-context';

const AuthContextProvider = props => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	const authenticate = useCallback(user => {
		setIsAuthenticated(true);
		setUser(user);
	}, []);

	const logout = useCallback(() => {
		setIsAuthenticated(false);
		setUser(null);
	}, []);

	useEffect(() => {
		fetch('/api/auth/check', {
			method: 'GET',
			credentials: 'include',
		})
			.then(res => res.json())
			.then(data => {
				if (data.isAuth) {
					authenticate(data.user);
				} else {
					logout();
				}
			});
	}, [authenticate, logout]);

	return (
		<authContext.Provider
			value={{
				isAuthenticated,
				user,
				authenticate,
				logout,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthContextProvider;
