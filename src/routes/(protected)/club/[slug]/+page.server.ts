import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { clubSchema } from '$lib/config/zod-schemas';
import { clubURL, getHeaders } from '$lib/utils/request-util';

export type Club = {
	id: number;
	name: string;
	description: string;
	status: 'REQUESTED' | 'APPROVED' | 'DENIED' | 'CANCELD' | 'DELETED';
	createDate: Date;
};

let club: Club;

export const load = async ({ params }: any) => {
	const id: string = params.slug;
	const form = await superValidate(clubSchema);
	const res: Response = await fetch(clubURL + '/v1/admin/clubs/' + id, {
		method: 'GET',
		headers: getHeaders()
	});
	club = await res.json();
	form.data = {
		id: club.id,
		name: club.name,
		description: club.description,
		status: club.status,
		createDate: new Date(club.createDate).toJSON().slice(0, 19)
	};
	return {
		form
	};
};

export const actions = {
	default: async ({ cookies, request }: any) => {
		const formData = await request.formData();
		const form = await superValidate(formData, clubSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { name, description, status } = form.data;
		const updateClub: string = JSON.stringify({
			// name: name,
			// description: description,
			status: status
		});
		const res: Response = await fetch(clubURL + '/v1/admin/clubs/' + club.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateClub
		});
		await res.json();
		redirect(302, `/club`);
	}
};
