import type { PageServerLoad, Actions } from '../$types';
import type { Country } from '$lib/model/response-type';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { clubEventSchema } from '$lib/config/zod-schemas';
import { apiURL, clubURL, getHeaders } from '$lib/utils/request-util';

export type ClubEvent = {
	id: number;
	name: string;
	description: string;
	gamecode: number;
	shopType: number;
	startDate: string;
	endDate: string;
	registerFrom: string;
	registerTo: string;
	useYn: string;
	body: string;
	createDate: Date;
	updateDate: Date;
	countries: Array<ClubEventCountry>;
};

type ClubEventCountry = {
	id: number;
	clubEventId: number;
	countryCode: string;
	createDate: Date;
	updateDate: Date;
};

let clubEvent: ClubEvent;
let countryGroup: Array<Country>;

export const load: PageServerLoad = async ({ params }: any) => {
	const clubEventId: string = params.slug;
	const form = await superValidate(clubEventSchema);
	const res: Response = await fetch(clubURL + '/v1/admin/club-events/' + clubEventId, {
		method: 'GET',
		headers: getHeaders()
	});
	clubEvent = await res.json();
	const countriesResponse: Response = await fetch(apiURL + '/v1/countries', {
		method: 'GET',
		headers: getHeaders()
	});
	countryGroup = await countriesResponse.json();
	const {
		id,
		name,
		description,
		gamecode,
		shopType,
		startDate,
		endDate,
		registerFrom,
		registerTo,
		useYn,
		body,
		createDate,
		updateDate,
		countries
	} = clubEvent;
	let checkedCountries = '';
	countries.forEach((c) => {
		if (checkedCountries.length == 0) checkedCountries = c.countryCode;
		else checkedCountries = checkedCountries.concat(',', c.countryCode);
	});
	form.data = {
		id,
		name,
		description,
		gamecode: gamecode.toString(),
		shopType: shopType === 0 ? 'General' : 'Part Time',
		startDate,
		endDate,
		registerFrom,
		registerTo,
		useYn: useYn === 'Y',
		body,
		createDate: new Date(createDate).toJSON().slice(0, 19),
		updateDate: new Date(updateDate).toJSON().slice(0, 19)
	};

	return {
		form,
		countryGroup,
		checkedCountries
	};
};

export const actions: Actions = {
	default: async ({ cookies, request }: any) => {
		const formData = await request.formData();
		const form = await superValidate(formData, clubEventSchema);
		const countryCodes: Array<string> = countryGroup
			.map((c) => c.code)
			.filter((code) => formData.get(code));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const {
			name,
			description,
			shopType,
			startDate,
			endDate,
			registerFrom,
			registerTo,
			useYn,
			body
		} = form.data;
		const updateClubEvents: string = JSON.stringify({
			name,
			description,
			shopType: shopType === 'General' ? 0 : 1,
			startDate,
			endDate,
			registerFrom,
			registerTo,
			useYn: useYn ? 'Y' : 'N',
			body,
			countryCodes
		});

		const res: Response = await fetch(clubURL + '/v1/admin/club-events/' + clubEvent.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateClubEvents
		});
		await res.json();
		redirect(302, `/club-event`);
	}
};
