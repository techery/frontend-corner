import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username, action } = await request.json();

	const setCookie = (name: string, value: string, httpOnly = false) =>
		cookies.set(name, value, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			httpOnly // <-- set it to TRUE if you don't want to share this cookie with HACKERS
		});

	let message = 'WHAAAAAAAAAAT';

	switch (action) {
		case 'login':
			if (username) {
				setCookie('auth', username);
				setCookie('superSecretToken', Math.random().toString(36).slice(2, 7), true);
				message = 'Login successful.';
			}
			break;

		case 'logout':
			cookies.delete('auth');
			cookies.delete('superSecretToken');
			message = 'Logout successful.';
			break;
	}

	return json({ message });
};
