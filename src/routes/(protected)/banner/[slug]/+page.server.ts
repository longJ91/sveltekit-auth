import type { Banner, BannerExposure, Country, Area } from '$lib/model/response-type';
import { apiURL, clubURL, getHeaders } from '$lib/utils/request-util';

type Exposure = {
	id: number;
	countyGroup: Array<Country>;
	cityAreaGroup: Array<Area>;
	districtAreaGroup: Array<Area>;
	userClass: string;
};

let banner: Banner;
let exposureGroup: Array<Exposure>;

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
			countyGroup: countries,
			cityAreaGroup: [],
			districtAreaGroup: [],
			userClass: banner.bannerExposures[index].userClass!
		});
		await fetchCityAreas(index, banner.bannerExposures[index].countryCode);
		const area: Area = {
			code: banner.bannerExposures[index].cityAreaCode,
			name: '',
			parentCode: banner.bannerExposures[index].countryCode
		};
		await fetchDistirctAraes(index, area);
	}
	return {
		id,
		banner,
		countries,
		exposureGroup
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

		const updateBanners: string = JSON.stringify({
			thumbnailUrl: thumbnailUrl,
			linkUrl: linkUrl,
			status: status,
			bannerExposures: bannerExposures
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
