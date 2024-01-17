import type { Banner, Country } from '$lib/model/response-type';
import { apiURL, clubURL, getHeaders } from '$lib/utils/request-util';

let banner: Banner;

export const load = async ({ params }: any) => {
	const id: string = params.slug;
	const res: Response = await fetch(clubURL + '/v1/admin/banners/' + id, {
		method: 'GET',
		headers: getHeaders()
	});
	banner = await res.json();

	const countriesResponse: Response = await fetch(apiURL + '/v1/countries', {
		method: 'GET',
		headers: getHeaders()
	});
	const countries: Array<Country> = await countriesResponse.json();
	return {
		id: id,
		banner: banner,
		countries: countries
	};
};

export const actions = {
	default: async ({ cookies, request }: any) => {
		const data = await request.formData();
		const thumbnailUrl = data.get('thumbnail-url');
		const linkUrl = data.get('link-url');
		const status = data.get('status');

		const updateBanners: string = JSON.stringify({
			thumbnailUrl: thumbnailUrl,
			linkUrl: linkUrl,
			status: status
		});

		const res: Response = await fetch(clubURL + '/v1/admin/banners/' + banner.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateBanners
		});
		await res.json();
		return { success: true };
	}
};
