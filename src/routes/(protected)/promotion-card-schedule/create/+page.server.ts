import type { Country } from '$lib/model/response-type';
import type { PageServerLoad, Actions } from '../$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { promotionCardScheduleSchema } from '$lib/config/zod-schemas';
import { apiURL, clubURL, getHeaders } from '$lib/utils/request-util';

export const load: PageServerLoad = async () => {
	const res: Response = await fetch(apiURL + '/v1/countries', {
		method: 'GET',
		headers: getHeaders()
	});
	const countries: Array<Country> = await res.json();
	return {
		form: await superValidate(promotionCardScheduleSchema),
		countries
	};
};

// Docs - https://superforms.rocks/faq#how-to-handle-file-uploads
// Superfroms 사용시 file type input 은 별도의 validate 이 필요합니다.
export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, promotionCardScheduleSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const startDateISO8601 = new Date(form.data.startDate).toISOString();
		const endDateISO8601 = new Date(form.data.endDate).toISOString();
		const createPromotinCard: string = JSON.stringify({
			countryCode: form.data.countryCode,
			type: form.data.type,
			category: form.data.category,
			title: form.data.title,
			startDate: startDateISO8601,
			endDate: endDateISO8601,
			isDisplay: form.data.isDisplay,
			linkUrl: form.data.linkUrl,
			backgroundImageUrl: form.data.backgroundImageUrl,
			symbolImageUrl: form.data.symbolImageUrl,
			pushType: form.data.pushType,
			pushValue: form.data.pushValue
		});
		const res: Response = await fetch(clubURL + '/v1/admin/promotion-card-schedules', {
			method: 'POST',
			headers: getHeaders(),
			body: createPromotinCard
		});
		await res.json();
		redirect(302, `/promotion-card-schedule`);
		return { success: true };
	}
};
