import type { PageServerLoad, Actions } from '../$types';
import type { Banner, BannerExposure, Country, Area, Exposure } from '$lib/model/response-type';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { bannerSchema } from '$lib/config/zod-schemas';
import { apiURL, clubURL, getHeaders } from '$lib/utils/request-util';

let banner: Banner;

export const load: PageServerLoad = async ({ params }: any) => {
	const countriesResponse: Response = await fetch(apiURL + '/v1/countries', {
		method: 'GET',
		headers: getHeaders()
	});
	const countryGroup: Array<Country> = await countriesResponse.json();
	return {
		form: await superValidate(bannerSchema),
		countryGroup
	};
};

export const actions = {
	default: async ({ cookies, request }: any) => {
		const formData = await request.formData();
		const form = await superValidate(formData, bannerSchema);
		const exposureCount = formData.get('banner-exposure-count');

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { thumbnailUrl, linkUrl, status } = form.data;
		let bannerExposures: Array<BannerExposure> = [];
		for (let idx = 0; idx < exposureCount; idx++) {
			const conturyCode: string | undefined = formData.get(idx + '-country-code');
			const cityAreaCode: string | undefined = formData.get(idx + '-city-area-code');
			const districtAreaCode: string | undefined = formData.get(idx + '-district-area-code');
			const userClass: string | undefined = formData.get(idx + '-user-class');

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
		const createBanners: string = JSON.stringify({
			thumbnailUrl,
			linkUrl,
			status: status ? 'ON' : 'OFF',
			bannerExposures
		});
		const res: Response = await fetch(clubURL + '/v1/admin/banners', {
			method: 'POST',
			headers: getHeaders(),
			body: createBanners
		});
		await res.json();
		redirect(302, `/banner`);
	}
};
