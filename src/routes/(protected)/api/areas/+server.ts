import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { apiURL, getHeaders } from '$lib/utils/request-util';

export const GET: RequestHandler = async ({ url }) => {
	const countryCodeQueryParam = 'countryCode=' + url.searchParams.get('countryCode');
	const areaCodeQueryParam = url.searchParams.get('areaCode')
		? 'areaCode=' + url.searchParams.get('areaCode')
		: '';
	const response: Response = await fetch(
		apiURL + '/v1/areas?' + countryCodeQueryParam + '&' + areaCodeQueryParam,
		{
			method: 'GET',
			headers: getHeaders()
		}
	);
	return response;
};
