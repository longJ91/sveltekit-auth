import { clubURL, getHeaders } from '$lib/utils/request-util';

export type Item = {
	id: number;
	imageUrl: string;
	price: number;
	itemId: number;
	createDate: Date;
}

let item: Item;

export const load = async ({ params }: any) => {
	const id: string = params.slug;
	const res: Response = await fetch(clubURL+'/v1/admin/items/' + id, {
		method: 'GET',
		headers: getHeaders()
	});
	item = await res.json();

	return {
		id: id,
		item: item
	};
};

export const actions = {
	default: async ({ cookies, request }: any) => {
		const data = await request.formData();
		const imageUrl = data.get('image-url');
		const price = data.get('price');
		const itemId = data.get('item-id');

		const updateItem: string = JSON.stringify({
			imageUrl: imageUrl,
			price: price,
			itemId: itemId,
		});

		const res: Response = await fetch(clubURL+'/v1/admin/items/' + item.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateItem
		});
		await res.json();
		return { success: true };
	}
};
