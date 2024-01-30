import type { PageServerLoad, Actions } from '../$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { noticeSchema } from '$lib/config/zod-schemas';
import { clubURL, getHeaders } from '$lib/utils/request-util';

export type Notice = {
	id: number;
	title: string;
	content: string;
	createDate: Date;
	updateDate: Date;
};

let notice: Notice;

export const load: PageServerLoad = async ({ params }: any) => {
	const id: string = params.slug;
	const form = await superValidate(noticeSchema);
	const res: Response = await fetch(clubURL + '/v1/admin/notices/' + id, {
		method: 'GET',
		headers: getHeaders()
	});
	notice = await res.json();
	form.data = {
		id: notice.id,
		title: notice.title,
		content: notice.content,
		createDate: new Date(notice.createDate).toJSON().slice(0, 19),
		updateDate: new Date(notice.updateDate).toJSON().slice(0, 19)
	};
	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ cookies, request }: any) => {
		const formData = await request.formData();
		const form = await superValidate(formData, noticeSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { title, content } = form.data;
		const updateNotice: string = JSON.stringify({
			title: title,
			content: content
		});
		const res: Response = await fetch(clubURL + '/v1/admin/notices/' + notice.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateNotice
		});
		await res.json();
		redirect(302, `/notice`);
	}
};
