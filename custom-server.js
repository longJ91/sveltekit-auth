// https://kit.svelte.dev/docs/adapter-node#custom-server
import { handler } from './build/handler.js';
import express, { Router } from 'express';
import http2 from 'http2';
import http2Express from 'http2-express-bridge';
import { StatusCodes } from 'http-status-codes';

const sleep = async (ms) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

console.log('=== start sleep ===');
await sleep(5000);
console.log('=== finish sleep ===');

const env = process.env.NODE_ENV;

const mainPort = env == 'local' ? 3000 : 8080;
const healthPort = env == 'local' ? 15087 : 15080;

const healthApp = express();
const router = Router();
// add a route that lives separately from the HealthServer app
router.get('/ac/health/readiness', (req, res) => {
	res.status(StatusCodes.OK).json();
});
router.get('/ac/health/liveness', (req, res) => {
	res.status(StatusCodes.OK).json();
});
healthApp.use('/', router);
healthApp.listen(healthPort, () => {
	console.log(`Health server started on ${healthPort} port`);
});

const mainApp = http2Express(express);
mainApp.use(handler);
const mainServer = http2.createServer(mainApp);

// [local test] curl --http2-prior-knowledge -v http://www.example.com
mainServer.listen(mainPort, () => {
	console.log(`Main server started on ${mainPort} port`);
});
