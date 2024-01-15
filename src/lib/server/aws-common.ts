import { fromIni } from '@aws-sdk/credential-provider-ini';

const awsRegion = 'ap-northeast-2';

const awsClientClientConfiguration = {
	region: awsRegion,
	credentials:
		process.env.NODE_ENV === 'local' ? fromIni({ profile: process.env.AWS_PROFILE }) : undefined
};

export { awsClientClientConfiguration };
