<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { APP_NAME } from '$lib/config/constants';
</script>

<svelte:head>
	<title>{APP_NAME}</title>
	<meta
		name="description"
		content="Sveltekit Auth Starter - An open source auth starter project utilizing lucia-auth, skeleton ui, prisma and sveltekit."
	/>
</svelte:head>

<div class="flex-1">
	<section class="container grid items-center gap-6">
		<div class="flex max-w-[1600px] flex-col items-center gap-2">
			<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
				{APP_NAME}
			</h1>
		</div>
		<div class="flex max-w-[1600px] flex-col items-center gap-2">
			<div class="flex gap-4">
				<Button on:click={() => goto('/auth/sign-in')}>Sign in</Button>
				<Button on:click={() => goto('/auth/sign-up')} variant="outline">Sign up</Button>
			</div>
		</div>
	</section>
</div>
