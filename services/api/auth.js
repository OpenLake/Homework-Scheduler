const reqRegister = async user => {
	const response = await fetch('/api/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
};

const reqLogin = async user => {
	const response = await fetch('/api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
};

const reqLogout = async () => {
	const response = await fetch('/api/auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
};

export { reqRegister, reqLogin, reqLogout };
