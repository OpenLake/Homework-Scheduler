import { createContext } from 'react';

const AuthContext = createContext({
	isAuthenticated: false,
	user: null,
	authenticate: () => {},
	logout: () => {},
});

export default AuthContext;
