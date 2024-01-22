import type { Banner, BannerExposure, Country } from '$lib/model/response-type';
import { apiURL, clubURL, getHeaders } from '$lib/utils/request-util';

let banner: Banner;

export const load = async ({ params }: any) => {
	const res: Response = await fetch(apiURL + '/v1/countries', {
		method: 'GET',
		headers: getHeaders()
	});
	const countries: Array<Country> = await res.json();
	return {
		countries
	};
};

export const actions = {
	default: async ({ cookies, request }: any) => {
		const data = await request.formData();
		const thumbnailUrl = data.get('thumbnail-url');
		const linkUrl = data.get('link-url');
		const status = data.get('status');
		const exposureCount = data.get('banner-exposure-count');

		let bannerExposures: Array<BannerExposure> = [];

		for (let idx = 0; idx < exposureCount; idx++) {
			const conturyCode: string | undefined = data.get(idx + '-country-code');
			const cityAreaCode: string | undefined = data.get(idx + '-city-area-code');
			const districtAreaCode: string | undefined = data.get(idx + '-district-area-code');
			const userClass: string | undefined = data.get(idx + '-user-class');

			let bannerExposure: BannerExposure = {};

			bannerExposure.userClass = userClass;
			if (districtAreaCode) {
				bannerExposure.districtAreaCode = districtAreaCode;
				bannerExposure.cityAreaCode = cityAreaCode;
				bannerExposure.countryCode = conturyCode;
			} else if (cityAreaCode) {
				bannerExposure.cityAreaCode = cityAreaCode;
				bannerExposure.countryCode = conturyCode;
			} else if (conturyCode) {
				bannerExposure.countryCode = conturyCode;
			} else {
				bannerExposure.countryCode = undefined;
				bannerExposure.cityAreaCode = undefined;
				bannerExposure.districtAreaCode = undefined;
			}
			bannerExposures.push(bannerExposure);
		}

		const createBanner: string = JSON.stringify({
			thumbnailUrl: thumbnailUrl,
			linkUrl: linkUrl,
			status: status,
			bannerExposures: bannerExposures
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
