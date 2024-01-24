import { loadFlash } from 'sveltekit-flash-message/server';
import { syncProperties } from '$lib/server/ssm';
import { syncSecretManagerProperties } from '$lib/server/secret-manager';
import { properties } from '$lib/server/properties';
export const load = loadFlash(async (event: { locals: { user: Lucia.UserAttributes } }) => {
    if (!properties.isDone) {
		await syncProperties();
		await syncSecretManagerProperties();
		properties.isDone = true;
	}
    return { user: event.locals.user };
});