export type PromotionCardSchedule = {
	id: number;
	countryCode: string;
	type: 'EVENT' | 'COMPETITION';
	category: string;
    title: string;
	startDate: Date;
    endDate: Date;
    isDisplay: Boolean;
    linkUrl: string;
    backgroundImageUrl: string;
    symbolImageUrl: string;
    pushType: number;
    pushValue: string;
};
