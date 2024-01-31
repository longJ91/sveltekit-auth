import type { PageServerLoad, Actions } from '../$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { itemSchema } from '$lib/config/zod-schemas';
import { clubURL, getHeaders } from '$lib/utils/request-util';

export type Item = {
	id: number;
	imageUrl: string;
	price: number;
	itemId: number;
	createDate: Date;
};

let item: Item;

export const load: PageServerLoad = async ({ params }: any) => {
	const id: string = params.slug;
	const form = await superValidate(itemSchema);
	const res: Response = await fetch(clubURL + '/v1/admin/items/' + id, {
		method: 'GET',
		headers: getHeaders()
	});
	item = await res.json();
	const { imageUrl, price, itemId } = item;
	form.data = {
		url: imageUrl,
		price: price.toString(),
		itemId: itemId.toString()
	};
	return {
		id,
		form
	};
};

export const actions: Actions = {
	default: async ({ request }: any) => {
		const formData = await request.formData();
		const form = await superValidate(formData, itemSchema);
		const url = formData.get('url');
		if (!form.valid || !url) {
			return fail(400, {
				form
			});
		}
		const { price, itemId } = form.data;
		const updateItem: string = JSON.stringify({
			imageUrl: url,
			price,
			itemId
		});
		const res: Response = await fetch(clubURL + '/v1/admin/items/' + item.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateItem
		});
		await res.json();
		redirect(302, `/item`);
	}
};
