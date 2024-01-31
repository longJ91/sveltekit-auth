import { object, z } from 'zod';

export const userSchema = z.object({
	firstName: z
		.string({ required_error: 'First Name is required' })
		.min(1, { message: 'First Name is required' })
		.trim(),
	lastName: z
		.string({ required_error: 'Last Name is required' })
		.min(1, { message: 'Last Name is required' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	confirmPassword: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	//terms: z.boolean({ required_error: 'You must accept the terms and privacy policy' }),
	role: z
		.enum(['USER', 'PREMIUM', 'ADMIN'], { required_error: 'You must have a role' })
		.default('USER'),
	verified: z.boolean().default(false),
	terms: z.literal<boolean>(true, {
		errorMap: () => ({ message: 'You must accept the terms & privacy policy' })
	}),
	token: z.string().optional(),
	receiveEmail: z.boolean().default(true),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});

export type UserSchema = typeof userSchema;

export const userUpdatePasswordSchema = userSchema
	.pick({ password: true, confirmPassword: true })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});

export type UserUpdatePasswordSchema = typeof userUpdatePasswordSchema;

export const bannerExposureSchema = z.object({
	id: z.number(),
	bannerId: z.string(),
	countryCode: z.string(),
	cityAreaCode: z.string(),
	districtAreaCode: z.string(),
	userClass: z.string()
});

export const bannerSchema = z.object({
	id: z.number(),
	thumbnailUrl: z.string(),
	linkUrl: z.string(),
	status: z.enum(['ON', 'OFF'], { required_error: 'Status is required' }),
	sequence: z.number(),
	bannerExposures: z.array(bannerExposureSchema, {
		errorMap: () => ({ message: 'You must add the exposure' })
	})
});

export type BannerSchema = typeof bannerSchema;

export const itemSchema = z.object({
	url: z.string(),
	price: z.string().min(1),
	itemId: z.string().min(1)
});

export type ItemSchema = typeof itemSchema;

export const promotionCardScheduleSchema = z.object({
	// id: z.number(),
	countryCode: z.string({ required_error: 'Country Code is required' }),
	type: z.enum(['EVENT', 'COMPETITION'], { required_error: 'Type is required' }),
	category: z.string({ required_error: 'Category is required' }),
	title: z.string({ required_error: 'Title is required' }),
	// Local Date
	startDate: z.string(),
	// Local Date
	endDate: z.string(),
	isDisplay: z.boolean({ required_error: 'Display is required' }),
	linkUrl: z.string(),
	backgroundImageUrl: z.string(),
	symbolImageUrl: z.string(),
	pushType: z.string().nullable(),
	pushValue: z.string().nullable()
});

export type PromotionCardScheduleSchema = typeof promotionCardScheduleSchema;

export const clubSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	status: z.string(),
	// ISO8601 Date
	createDate: z.string()
});

export type ClubSchema = typeof clubSchema;

export const noticeSchema = z.object({
	id: z.number(),
	title: z.string(),
	content: z.string(),
	// ISO8601 Date
	createDate: z.string(),
	// ISO8601 Date
	updateDate: z.string()
});

export type NoticeSchema = typeof noticeSchema;

export const clubEventCountry = z.object({
	id: z.number(),
	clubEventId: z.number(),
	countryCode: z.string(),
	createDate: z.date(),
	updateDate: z.date()
});

export const clubEventSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	gamecode: z.string(),
	shopType: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	registerFrom: z.string(),
	registerTo: z.string(),
	useYn: z.boolean(),
	body: z.string(),
	// ISO8601 Date
	createDate: z.string(),
	// ISO8601 Date
	updateDate: z.string(),
	// countries: z.array(clubEventCountry)
});

export type ClubEventSchema = typeof clubEventSchema;
