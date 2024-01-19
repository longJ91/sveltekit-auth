import type { RequestHandler } from '../$types';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const signedUrl: string = formData.get('signedUrl') as string;
	const file: File = formData.get('file') as File;
	const binaryData = await file.arrayBuffer();
	const response: Response = await fetch(signedUrl, {
		method: 'PUT',
		headers: {
			'Content-Type': file.type
		},
		body: binaryData
	});
	return response;
};
