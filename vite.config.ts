import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/#using-environment-variables-in-config
export default defineConfig(({mode}) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [sveltekit()],
	server: {
		port: Number(env.SVELTEKIT_PORT)
	}
	}
});
