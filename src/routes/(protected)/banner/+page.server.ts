import type { BannerInfoResponse } from '$lib/model/response-type';
import { clubURL, getHeaders } from '$lib/utils/request-util';

export const load = async ({ url }: any) => {
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

	const res = await fetch(clubURL + '/v1/admin/banners' + queryParams, {
		method: 'GET',
		headers: getHeaders()
	});
	const item: BannerInfoResponse = await res.json();

	return {
		bannerInfoResponse: item
	};
};
