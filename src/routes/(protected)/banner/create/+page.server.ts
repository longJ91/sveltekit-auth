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
		countries: countries
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
			const conturyCode: string | undefined = data.get(idx + '-depth2');
			const depth3: string | undefined = data.get(idx + '-depth3');
			const depth4: string | undefined = data.get(idx + '-depth4');
			const userClass: string | undefined = data.get(idx + '-user-class');

			let bannerExposure: BannerExposure = {};

			if (depth4) {
				bannerExposure.areaDepth = 4;
				bannerExposure.areaCode = depth4;
				bannerExposure.userClass = userClass;
			} else if (depth3) {
				bannerExposure.areaDepth = 3;
				bannerExposure.areaCode = depth3;
				bannerExposure.userClass = userClass;
			} else if (conturyCode) {
				bannerExposure.areaDepth = 2;
				bannerExposure.areaCode = conturyCode;
				bannerExposure.userClass = userClass;
			} else {
				bannerExposure.areaDepth = undefined;
				bannerExposure.areaCode = undefined;
				bannerExposure.userClass = userClass;
			}

			bannerExposures.push(bannerExposure);
		}

		const createBanner: string = JSON.stringify({
			thumbnailUrffl: thumbnailUrl,
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
