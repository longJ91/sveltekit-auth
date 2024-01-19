import type { PageServerLoad, Actions } from '../$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '../schema';
import { clubURL, getHeaders } from '$lib/utils/request-util';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(formSchema)
	};
};

// Docs - https://superforms.rocks/faq#how-to-handle-file-uploads
// Superfroms 사용시 file type input 은 별도의 validate 이 필요합니다.
export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, formSchema);
		const url = formData.get('url');
		if (!form.valid || !url) {
			return fail(400, {
				form
			});
		}
		const price = form.data.price;
		const itemId = form.data.itemId;

		const createItem: string = JSON.stringify({
			imageUrl: url,
			price: price,
			itemId: itemId
		});

		const res: Response = await fetch(clubURL + '/v1/admin/items', {
			method: 'POST',
			headers: getHeaders(),
			body: createItem
		});
		await res.json();
		redirect(302, `/item`);
		// return { success: true };
	}
};
