import {
	GetSecretValueCommand,
	SecretsManagerClient,
	type GetSecretValueCommandOutput
} from '@aws-sdk/client-secrets-manager';
import { awsClientClientConfiguration } from './aws-common.js';
import { properties, secretManagerName } from './properties.js';
// import logger from "../util/logger.js";

const secretManagerClient = new SecretsManagerClient(awsClientClientConfiguration);

const getSecrets = async (name: string): Promise<any> => {
	const output: GetSecretValueCommandOutput = await secretManagerClient.send(
		new GetSecretValueCommand({
			SecretId: name
		})
	);

	if (output.SecretString === undefined) {
		// TODO 없을 때 시스템 에러로 프로세스 종료
	}
	return JSON.parse(output.SecretString || '{}');
};

const syncSecretManagerProperties = async () => {
	if (process.env.NODE_ENV === 'local') {
		console.info('Local secret manager properties done!');
		return;
	}

	const rdsProperties = await getSecrets(secretManagerName.RDS);
	properties.rds.username = rdsProperties.username;
	properties.rds.password = rdsProperties.password;
	properties.rds.host = rdsProperties.host;
	properties.rds.port = Number(rdsProperties.port);
	properties.rds.dbname = rdsProperties.dbname;
	properties.rds.schema = rdsProperties.schema;

	console.info('Sync secret manager properties done!');
};

export { syncSecretManagerProperties };
