import { clubURL, getHeaders } from '$lib/utils/request-util';

export type Notice = {
	id: number;
	title: string;
	content: string;
	createDate: Date;
	updateDate: Date;
}

let notice: Notice;

export const load = async ({ params }: any) => {
	const id: string = params.slug;
	const res: Response = await fetch(clubURL+'/v1/admin/notices/' + id, {
		method: 'GET',
		headers: getHeaders()
	});
	notice = await res.json();

	return {
		id: id,
		notice: notice
	};
};

export const actions = {
	default: async ({ cookies, request }: any) => {
		const data = await request.formData();
		const title = data.get('title');
		const content = data.get('content');

		const updateNotice: string = JSON.stringify({
			title: title,
			content: content,
		});

		const res: Response = await fetch(clubURL+'/v1/admin/notices/' + notice.id, {
			method: 'PUT',
			headers: getHeaders(),
			body: updateNotice
		});
		await res.json();
		return { success: true };
	}
};
