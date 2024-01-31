import type { Country } from '$lib/model/response-type';
import type { PageServerLoad, Actions } from '../$types';
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
	startDate: Date;
	endDate: Date;
	registerFrom: Date;
	registerTo: Date;
	useYn: string;
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

let countryGroup: Array<Country>;

export const load: PageServerLoad = async ({ params }: any) => {
	const countriesResponse: Response = await fetch(apiURL + '/v1/countries', {
		method: 'GET',
		headers: getHeaders()
	});
	countryGroup = await countriesResponse.json();
	return {
		form: await superValidate(clubEventSchema),
		countryGroup
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
		const createClubEvent: string = JSON.stringify({
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

		const res: Response = await fetch(clubURL + '/v1/admin/club-events', {
			method: 'POST',
			headers: getHeaders(),
			body: createClubEvent
		});
		await res.json();
		redirect(302, `/club-event`);
	}
};
