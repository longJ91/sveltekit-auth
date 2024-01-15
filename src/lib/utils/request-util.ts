import { properties } from '../server/properties.js';
// import { PUBLIC_API_URL } from '$env/static/public';

const clubURL = properties.url.club;
const apiURL = properties.url.api;

type Headers = {
	[key: string]: string;
};

const headers: Headers = {
	'Device-Model': 'iPhone',
	'OS-Type': 'ios',
	'OS-Version': '1.0.0',
	'App-Version': '1.0.0',
	'Country-Code': 'KR',
	'Accept-Language': 'ko',
	'Content-Type': 'application/json',
	// 'Session': ''
};

function getHeaders(): Headers {
	headers['Request-ID'] = generateRequtesId();
	return headers;
}

function generateRequtesId(): string {
	return crypto.randomUUID();
}

function objectToFormData(obj: any): FormData {
	const formData = new FormData();

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			formData.append(key, obj[key]);
		}
	}

	return formData;
}

export { apiURL, clubURL, getHeaders, generateRequtesId, objectToFormData };
