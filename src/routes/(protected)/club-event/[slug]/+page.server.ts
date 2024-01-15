import { clubURL, getHeaders } from '$lib/utils/request-util';

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

let clubEvent: ClubEvent;

export const load = async ({ params }: any) => {
	const id: string = params.slug;
	const res: Response = await fetch(clubURL + '/v1/admin/club-events/' + id, {
		method: 'GET',
		headers: getHeaders()
	});
	clubEvent = await res.json();
	let countryCodes = '';
	clubEvent.countries.forEach((clubEventCountry) => {
		if (countryCodes.length == 0) countryCodes = clubEventCountry.countryCode;
		else countryCodes = countryCodes.concat(',', clubEventCountry.countryCode);
	});

	return {
		id: id,
		clubEvent: clubEvent,
		countryCodes: countryCodes
	};
};

export const actions = {
	default: async ({ cookies, request }: any) => {
		const data = await request.formData();

		const name = data.get('name');
		const description = data.get('description');
		const shopType =
			data.get('shop-type-radio-0') == null
				? data.get('shop-type-radio-1')
				: data.get('shop-type-radio-0');
		const startDate = data.get('start-date');
		const endDate = data.get('end-date');
		const registerFrom = data.get('register-from');
		const registerTo = data.get('register-to');
		const useYn = data.get('use-y-n') == null ? 'N' : data.get('use-y-n');
		const countryCodes = data.get('countryCodes').split(',');

		const updateClubEvents: string = JSON.stringify({
			name: name,
			description: description,
			shopType: shopType,
			startDate: startDate,
			endDate: endDate,
			registerFrom: registerFrom,
			registerTo: registerTo,
			useYn: useYn,
			countryCodes: countryCodes
		});

		const res: Response = await fetch(clubURL + '/v1/admin/club-events/' + clubEvent.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateClubEvents
		});
		await res.json();
		return { success: true };
	}
};
