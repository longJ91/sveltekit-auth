import type { Banner, Country } from '$lib/model/response-type';
import { apiURL, clubURL, getHeaders } from '$lib/utils/request-util';

let banner: Banner;

export const load = async ({ params }: any) => {
	const res: Response = await fetch(apiURL + '/v1/countries', {
		method: 'GET',
		headers: getHeaders()
	});
	const countries: Array<Country> = await res.json();
	return {
		countries: countries
	};
};

export const actions = {
	default: async ({ cookies, request }: any) => {
		const data = await request.formData();
		const thumbnailUrl = data.get('thumbnail-url');
		const linkUrl = data.get('link-url');
		const status = data.get('status');

		const createBanner: string = JSON.stringify({
			thumbnailUrl: thumbnailUrl,
			linkUrl: linkUrl,
			status: status
		});

		const res: Response = await fetch(clubURL + '/v1/admin/banners', {
			method: 'POST',
			headers: getHeaders(),
			body: createBanner
		});
		await res.json();
		return { success: true };
	}
};
