import type { PageServerLoad, Actions } from '../$types';
import type { Banner, BannerExposure, Country, Area, Exposure } from '$lib/model/response-type';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { bannerSchema } from '$lib/config/zod-schemas';
import { apiURL, clubURL, getHeaders } from '$lib/utils/request-util';

let banner: Banner;
let exposureGroup: Array<Exposure>;

export const load: PageServerLoad = async ({ params }: any) => {
	const bannerId: string = params.slug;
	const form = await superValidate(bannerSchema);
	const res: Response = await fetch(clubURL + '/v1/admin/banners/' + bannerId, {
		method: 'GET',
		headers: getHeaders()
	});
	banner = await res.json();
	const { id, thumbnailUrl, linkUrl, status, sequence, createDate, updateDate, bannerExposures } =
		banner;
	form.data = {
		id,
		thumbnailUrl,
		linkUrl,
		status: status == 'ON',
		sequence,
		createDate: new Date(createDate).toJSON().slice(0, 19),
		updateDate: new Date(updateDate).toJSON().slice(0, 19)
	};

	const countriesResponse: Response = await fetch(apiURL + '/v1/countries', {
		method: 'GET',
		headers: getHeaders()
	});
	const countryGroup: Array<Country> = await countriesResponse.json();
	const fetchCityAreas = async (idx: number, countryCode?: string) => {
		const response: Response = await fetch(apiURL + '/v1/areas?countryCode=' + countryCode, {
			method: 'GET',
			headers: getHeaders()
		});
		const result: Array<Area> = await response.json();
		exposureGroup[idx].cityAreaGroup = [...result];
		exposureGroup = exposureGroup.with(idx, exposureGroup[idx]);
	};
	const fetchDistirctAraes = async (idx: number, arae: Area) => {
		const response: Response = await fetch(
			apiURL + '/v1/areas?countryCode=' + arae.parentCode + '&areaCode=' + arae.code,
			{
				method: 'GET',
				headers: getHeaders()
			}
		);
		const result: Array<Area> = await response.json();
		exposureGroup[idx].districtAreaGroup = [...result];
		exposureGroup = exposureGroup.with(idx, exposureGroup[idx]);
	};

	for (let index = 0; index < banner.bannerExposures.length; index++) {
		if (index == 0) exposureGroup = [];
		exposureGroup = exposureGroup.concat({
			id: index,
			countryGroup,
			cityAreaGroup: [],
			districtAreaGroup: [],
			userClass: banner.bannerExposures[index].userClass!
		});
		if (banner.bannerExposures[index].countryCode) {
			await fetchCityAreas(index, banner.bannerExposures[index].countryCode);
			if (banner.bannerExposures[index].cityAreaCode) {
				const area: Area = {
					code: banner.bannerExposures[index].cityAreaCode,
					name: '',
					parentCode: banner.bannerExposures[index].countryCode
				};
				await fetchDistirctAraes(index, area);
			}
		}
	}
	return {
		form,
		bannerExposures,
		countryGroup,
		exposureGroup
	};
};

export const actions: Actions = {
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
		const updateBanners: string = JSON.stringify({
			thumbnailUrl,
			linkUrl,
			status: status ? 'ON' : 'OFF',
			bannerExposures
		});
		const res: Response = await fetch(clubURL + '/v1/admin/banners/' + banner.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateBanners
		});
		await res.json();
		redirect(302, `/banner`);
	}
};
