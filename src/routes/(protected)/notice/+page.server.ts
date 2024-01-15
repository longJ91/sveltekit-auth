import { clubURL, getHeaders } from '$lib/utils/request-util';
import type { Notice } from './[slug]/+page.server';

type NoticeInfdResponse = {
	notices: Array<Notice>;
	totalPage: number;
	currentPage: number;
}


export const load = async ({ url }: any) => {
	const page: string | undefined = url.searchParams.get('page');
	const windowSize: string | undefined = url.searchParams.get('windowSize');
	const status: string | undefined = url.searchParams.get('status');
	const createDate: string | undefined = url.searchParams.get('createDate');
	let queryParams: string = '?';
	if (page) queryParams = queryParams.concat('page=' + page + '&');
	if (windowSize) queryParams = queryParams.concat('windowSize=' + windowSize + '&');
	if (status) queryParams = queryParams.concat('status=' + status + '&');
	if (createDate) queryParams = queryParams.concat('createDate=' + createDate + '&');

	const res = await fetch(clubURL+'/v1/admin/notices' + queryParams, {
		method: 'GET',
		headers: getHeaders()
	});
	const item: NoticeInfdResponse = await res.json();

	return {
		noticeInfoResponse: item
	};
};
