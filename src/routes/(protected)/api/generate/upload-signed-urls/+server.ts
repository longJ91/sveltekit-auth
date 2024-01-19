import type { RequestHandler } from '../../$types';
import { apiURL, getHeaders } from '$lib/utils/request-util';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const response: Response = await fetch(apiURL + '/v1/generate/upload-signed-urls', {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(body)
	});
	
	return response;
};
