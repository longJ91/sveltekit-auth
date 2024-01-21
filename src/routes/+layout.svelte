<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { getFlash } from 'sveltekit-flash-message';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import HeaderNavigation from '$lib/components/navigation/header-navigation.svelte';
	import SideNavigation from '$lib/components/navigation/aside-navigation.svelte';

	export let data: any;
	let user: Lucia.UserAttributes;
	$: user = data.user;
	const flash = getFlash(page);
	// $: console.log('+layout.svelte root flash: ' + JSON.stringify($flash));
	$: if ($flash) {
		switch ($flash.type) {
			case 'success':
				//console.log('flash.message.success: ' + $flash.message);
				toast.success($flash.message);
				break;
			case 'error':
				//console.log('flash.message.error: ' + $flash.message);
				toast.error($flash.message);
				break;
		}
	}
</script>

<ModeWatcher />
<Toaster richColors />
<div class="relative flex min-h-screen flex-col">
	<HeaderNavigation {user} />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<SideNavigation />
		<div class="flex-1 lg:max-w-6xl pt-10">
			<slot />
		</div>
	</div>
</div>
