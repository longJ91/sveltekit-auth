import { PrismaClient } from '@prisma/client';
import { properties } from '$lib/server/properties';
import { DATABASE_URL } from '$env/static/private';

// https://www.prisma.io/docs/orm/reference/prisma-client-reference#datasources
const prismaClient = new PrismaClient({
	datasources: {
		db: {
			// url: `${properties.rds.protocol}://${properties.rds.username}:${properties.rds.password}@${properties.rds.host}:${properties.rds.port}/${properties.rds.dbname}?${properties.rds.schema}`
			url: DATABASE_URL
		}
	}
});

export default prismaClient;
