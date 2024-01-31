import type { PageServerLoad, Actions } from '../$types';
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

export const load: PageServerLoad = async ({ params }: any) => {
	const clubId: string = params.slug;
	const form = await superValidate(clubSchema);
	const res: Response = await fetch(clubURL + '/v1/admin/clubs/' + clubId, {
		method: 'GET',
		headers: getHeaders()
	});
	club = await res.json();
	const { id, name, description, status, createDate } = club;
	form.data = {
		id,
		name,
		description,
		status,
		createDate: new Date(createDate).toJSON().slice(0, 19)
	};
	return {
		form
	};
};

export const actions: Actions = {
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
			// name,
			// description,
			status
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
