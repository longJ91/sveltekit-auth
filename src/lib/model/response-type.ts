type Country = {
	code: string;
	name: string;
};

type BannerExposure = {
	id?: number;
	bannerId?: number;
	areaDepth: number;
	areaCode: string;
	userClass: string;
};

type Banner = {
	id: number;
	thumbnailUrl: string;
	linkUrl: string;
	status: string;
	sequence: number;
	createDate: Date;
	updateDate: Date;
	bannerExposures: Array<BannerExposure>;
};

type BannerInfo = {
	banners: Array<Banner>;
	totalPage: number;
	currentPage: number;
	totalCount: number;
	windowSize: number;
};

export type { Country, BannerExposure, Banner, BannerInfo };
