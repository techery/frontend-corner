import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	return json({result: 'OK'});
};