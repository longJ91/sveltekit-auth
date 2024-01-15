import { PrismaClient } from '@prisma/client';
import { DATABASE_URL } from '$env/static/private';

// https://www.prisma.io/docs/orm/reference/prisma-client-reference#datasources
const prismaClient = new PrismaClient({
	datasources: {
		db: {
			url: DATABASE_URL
		}
	}
});

export default prismaClient;
