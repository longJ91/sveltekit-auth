import type { Country } from '$lib/model/response-type';
import type { PageServerLoad, Actions } from '../$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { promotionCardScheduleSchema } from '$lib/config/zod-schemas';
import { apiURL, clubURL, getHeaders } from '$lib/utils/request-util';

export type PromotionCardSchedule = {
	id: number;
	countryCode: string;
	type: 'EVENT' | 'COMPETITION';
	category: string;
	title: string;
	startDate: string;
	endDate: string;
	isDisplay: boolean;
	linkUrl: string;
	backgroundImageUrl: string;
	symbolImageUrl: string;
	pushType: string;
	pushValue: string;
};

let promotionCardSchdule: PromotionCardSchedule;

export const load: PageServerLoad = async ({ params }: any) => {
	const id: string = params.slug;
	const form = await superValidate(promotionCardScheduleSchema);
	const countryResponse: Response = await fetch(apiURL + '/v1/countries', {
		method: 'GET',
		headers: getHeaders()
	});
	const countries: Array<Country> = await countryResponse.json();
	const res: Response = await fetch(clubURL + '/v1/admin/promotion-card-schedules/' + id, {
		method: 'GET',
		headers: getHeaders()
	});
	promotionCardSchdule = await res.json();
	const {
		countryCode,
		type,
		category,
		title,
		startDate,
		endDate,
		isDisplay,
		linkUrl,
		backgroundImageUrl,
		symbolImageUrl,
		pushType,
		pushValue
	} = promotionCardSchdule;
	form.data = {
		countryCode,
		type,
		category,
		title,
		startDate,
		endDate,
		isDisplay,
		linkUrl,
		backgroundImageUrl,
		symbolImageUrl,
		pushType,
		pushValue
	};
	return {
		form,
		countries
	};
};

export const actions: Actions = {
	default: async ({ request }: any) => {
		const formData = await request.formData();
		const form = await superValidate(formData, promotionCardScheduleSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const {
			countryCode,
			type,
			category,
			title,
			startDate,
			endDate,
			isDisplay,
			linkUrl,
			backgroundImageUrl,
			symbolImageUrl,
			pushType,
			pushValue
		} = form.data;
		const updatePromotionCardSchedule: string = JSON.stringify({
			countryCode,
			type,
			category,
			title,
			startDate,
			endDate,
			isDisplay,
			linkUrl,
			backgroundImageUrl,
			symbolImageUrl,
			pushType,
			pushValue
		});
		const res: Response = await fetch(
			clubURL + '/v1/admin/promotion-card-schedules/' + promotionCardSchdule.id,
			{
				method: 'PUT',
				headers: getHeaders(),
				body: updatePromotionCardSchedule
			}
		);
		await res.json();
		redirect(302, `/promotion-card-schedule`);
	}
};
