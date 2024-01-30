import { clubURL, getHeaders } from '$lib/utils/request-util';
import type { PageServerLoad } from './$types';
import type { Club } from './[slug]/+page.server';

type ClubInfoResponse = {
	clubs: Array<Club>;
	totalPage: number;
	currentPage: number;
	totalCount: number;
	windowSize: number;
};

export const load: PageServerLoad = async ({ url }: any) => {
	const page: string | undefined = url.searchParams.get('page');
	// const windowSize: string | undefined = url.searchParams.get('windowSize');
	const windowSize: number = 9999;
	const status: string | undefined = url.searchParams.get('status');
	const createDate: string | undefined = url.searchParams.get('createDate');
	let queryParams: string = '?';
	if (page) queryParams = queryParams.concat('page=' + page + '&');
	if (windowSize) queryParams = queryParams.concat('windowSize=' + windowSize + '&');
	if (status) queryParams = queryParams.concat('status=' + status + '&');
	if (createDate) queryParams = queryParams.concat('createDate=' + createDate + '&');

	const res = await fetch(clubURL + '/v1/admin/clubs' + queryParams, {
		method: 'GET',
		headers: getHeaders()
	});
	const item: ClubInfoResponse = await res.json();
	return {
		clubInfoResponse: item
	};
};
