import { GetParametersCommand, SSMClient } from '@aws-sdk/client-ssm';
import { properties, ssmName } from './properties.js';
// import logger from "../util/logger.js";
import { awsClientClientConfiguration } from './aws-common.js';

const ssmClient = new SSMClient(awsClientClientConfiguration);

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ssm/interfaces/getparameterscommandinput.html
const syncProperties = async () => {
	if (process.env.NODE_ENV === 'local') {
		console.info('Local properties done!');
		return;
	}

	const ssmProperties = await ssmClient
		.send(
			new GetParametersCommand({
				Names: [
					ssmName.SERVER_PORT_MAIN,
					ssmName.SERVER_PORT_HEALTH,
					ssmName.LOGGING_LEVEL,
					ssmName.AWS_REGION,
					ssmName.URL_API,
					ssmName.URL_CLUB
				]
			})
		)
		.catch((reason) => {
			console.error(`syncProperties Error: ${reason}`);
			process.exit(1);
		});

	const propertiesMap = ssmProperties.Parameters?.reduce((map, obj) => {
		map.set(obj.Name, obj.Value);
		return map;
	}, new Map());

	properties.server.port.main = propertiesMap?.get(ssmName.SERVER_PORT_MAIN);
	properties.server.port.health = propertiesMap?.get(ssmName.SERVER_PORT_HEALTH);
	properties.logging.level = propertiesMap?.get(ssmName.LOGGING_LEVEL);
	properties.aws.region = propertiesMap?.get(ssmName.AWS_REGION);
	properties.url.api = propertiesMap?.get(ssmName.URL_API);
	properties.url.club = propertiesMap?.get(ssmName.URL_CLUB);

	console.info('Sync properties done!');
};

export { syncProperties };
