import { clubURL, getHeaders } from '$lib/utils/request-util';

export type Club = {
	id: number;
	name: string;
	description: string;
	status: string;
	createDate: Date;
};

let club: Club;

export const load = async ({ params }: any) => {
	const id: string = params.slug;
	const res: Response = await fetch(clubURL+'/v1/admin/clubs/' + id, {
		method: 'GET',
		headers: getHeaders()
	});
	club = await res.json();

	return {
		id: id,
		club: club
	};
};

export const actions = {
	default: async ({ cookies, request }: any) => {
		const data = await request.formData();
		const crruectStatus = data.get('default-radio');

		club.status = crruectStatus;

		const updateClub: string = JSON.stringify({
			name: club.name,
			description: club.description,
			status: club.status
		});

		const res: Response = await fetch(clubURL+'/v1/admin/clubs/' + club.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateClub
		});
		await res.json();
		return { success: true };
	}
};
