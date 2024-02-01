type Country = {
	code: string;
	name: string;
};

type Area = {
	code?: string;
	name: string;
	parentCode?: string;
};

type Exposure = {
	id: number;
	countryGroup: Array<Country>;
	cityAreaGroup: Array<Area>;
	districtAreaGroup: Array<Area>;
	userClass: string;
};

type BannerExposure = {
	id?: number;
	bannerId?: number;
	countryCode?: string;
	cityAreaCode?: string;
	districtAreaCode?: string;
	userClass?: string;
};

type Banner = {
	id: number;
	thumbnailUrl: string;
	linkUrl: string;
	status: 'ON' | 'OFF';
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

export type { Country, Area, Exposure, BannerExposure, Banner, BannerInfo };
