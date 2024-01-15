import { clubURL, getHeaders } from '$lib/utils/request-util';
import type { ClubEvent } from './[slug]/+page.server';

type ClubEventInfoResponse = {
	clubEvents: Array<ClubEvent>;
	totalPage: number;
	currentPage: number;
};

export const load = async ({ url }: any) => {
	const page: string | undefined = url.searchParams.get('page');
	const windowSize: string | undefined = url.searchParams.get('windowSize');
	const createDate: string | undefined = url.searchParams.get('createDate');
	let queryParams: string = '?';
	if (page) queryParams = queryParams.concat('page=' + page + '&');
	if (windowSize) queryParams = queryParams.concat('windowSize=' + windowSize + '&');
	if (createDate) queryParams = queryParams.concat('createDate=' + createDate + '&');

	const res = await fetch(clubURL + '/v1/admin/club-events' + queryParams, {
		method: 'GET',
		headers: getHeaders()
	});
	const item: ClubEventInfoResponse = await res.json();

	return {
		clubEventInfoResponse: item
	};
};
