const ssmName = {
	SERVER_PORT_MAIN: '/pdk/dartsmate/dev/common/spring/server.port',
	SERVER_PORT_HEALTH: '/pdk/dartsmate/dev/common/spring/management.server.port',
	LOGGING_LEVEL: '/pdk/dartsmate/dev/common/spring/logging.pattern.level',
	AWS_REGION: '/pdk/dartsmate/dev/infra/aws/aws.region',
	URL_API: '/pdk/dartsmate/dev/infra/domain/url.api-internal',
	URL_CLUB: '/pdk/dartsmate/dev/infra/domain/url.club'
};

const secretManagerName = {
	RDS: 'pdk/dev/rds/main/dartsmate'
};

const properties = {
	isDone: false,
	server: {
		port: {
			main: 3000,
			health: 15087
		}
	},
	logging: {
		level: 'debug'
	},
	aws: {
		region: 'ap-northeast-2'
	},
	url: {
		api: 'http://127.0.0.1:8080',
		club: 'http://127.0.0.1:8082'
	},
	// postgresql://postgres:postgres@127.0.0.1:5432/dartsmate_admin
	rds: {
		protocol: 'postgresql',
		username: 'postgres',
		password: 'postgres',
		host: '127.0.0.1',
		port: 5432,
		dbname: 'dartsmate_admin',
		schema: '',
		timeout: 3000,
		connectTimeout: 5000
	}
};

export { properties, ssmName, secretManagerName };
