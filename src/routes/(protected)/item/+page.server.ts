import type { PageServerLoad } from './$types';
import type { Item } from './[slug]/+page.server';
import { clubURL, getHeaders } from '$lib/utils/request-util';

type ItemInfoResponse = {
	items: Array<Item>;
	totalPage: number;
	currentPage: number;
	totalCount: number;
	windowSize: number;
}

export const load: PageServerLoad = async ({ url }: any) => {
	const page: string | undefined = url.searchParams.get('page');
	// const windowSize: string | undefined = url.searchParams.get('windowSize');
	const windowSize: number = 9999;
	const createDate: string | undefined = url.searchParams.get('createDate');
	let queryParams: string = '?';
	if (page) queryParams = queryParams.concat('page=' + page + '&');
	if (windowSize) queryParams = queryParams.concat('windowSize=' + windowSize + '&');
	if (createDate) queryParams = queryParams.concat('createDate=' + createDate + '&');
	
	const res = await fetch(clubURL+'/v1/admin/items' + queryParams, {
		method: 'GET',
		headers: getHeaders()
	});
	const item: ItemInfoResponse = await res.json();

	return {
		itemInfoResponse: item
	};
};
