// lib/server/lucia.ts
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import prismaClient from '$lib/config/prisma';

import { prisma } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			userId: data.id,
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			role: data.role,
			verified: data.verified,
			receiveEmail: data.receiveEmail,
			token: data.token
		};
	}
});

export type Auth = typeof auth;
