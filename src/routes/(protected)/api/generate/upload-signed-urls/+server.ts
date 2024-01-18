import type { RequestHandler } from '../../$types';
import { apiURL, getHeaders } from '$lib/utils/request-util';

export const GET: RequestHandler = async ({ url }) => {
	const body: string = JSON.stringify([
		{
			fileName: 'file_1_png',
			fileExtension: 'png',
			mediaType: 'image/png',
			serviceType: 'ADMIN_BANNER_THUMBNAIL'
		},
		{
			fileName: 'file_2_png',
			fileExtension: 'png',
			mediaType: 'image/png',
			serviceType: 'ADMIN_ITEM_IMAGE'
		}
	]);
	const response: Response = await fetch(apiURL + '/v1/generate/upload-signed-urls', {
		method: 'POST',
		headers: getHeaders(),
		body: body
	});
	
	return response;
};
