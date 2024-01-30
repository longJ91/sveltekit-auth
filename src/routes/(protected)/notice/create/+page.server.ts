import type { PageServerLoad, Actions } from '../$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { noticeSchema } from '$lib/config/zod-schemas';
import { clubURL, getHeaders } from '$lib/utils/request-util';

export const load: PageServerLoad = async ({ params }: any) => {
	return {
		form: await superValidate(noticeSchema)
	};
};

// Docs - https://superforms.rocks/faq#how-to-handle-file-uploads
// Superfroms 사용시 file type input 은 별도의 validate 이 필요합니다.
export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, noticeSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { title, content } = form.data;
		const createNotice: string = JSON.stringify({
			title: title,
			content: content
		});
		const res: Response = await fetch(clubURL + '/v1/admin/notices', {
			method: 'POST',
			headers: getHeaders(),
			body: createNotice
		});
		await res.json();
		redirect(302, `/notice`);
	}
};
