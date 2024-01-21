<script lang="ts">
	import {
		Sun,
		Moon,
		SunMoon,
		UserRound,
		LogOut,
		Contact2,
		UserCircle2,
		Lock,
		Target,
		Newspaper,
		Image,
		Link2,
		Cat
	} from 'lucide-svelte';
	import { page } from '$app/stores';

	$: currentPage = $page.url.pathname;
</script>

<aside class="-mx-4 lg:w-1/6">
	<nav class="flex items-start space-x-2 lg:flex-col lg:space-x-4 lg:space-y-1">
		<h4
			class="inline-flex items-center rounded-md text-xl font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
		></h4>
		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/club"
			class:active={'/club' === currentPage}><span class="pr-2"><Target /></span>Club</a
		>

		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/notice"
			class:active={'/notice' === currentPage}><span class="pr-2"><Newspaper /></span>Notice</a
		>

		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/banner"
			class:active={'/banner' === currentPage}><span class="pr-2"><Image /></span>Banner</a
		>

		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/club-event"
			class:active={'/club-event' === currentPage}><span class="pr-2"><Link2 /></span>Club Event</a
		>

		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/item"
			class:active={'/item' === currentPage}><span class="pr-2"><Cat /></span>Item</a
		>
		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/sample-table"
			class:active={'/sample-table' === currentPage}>Sample Table</a
		>
	</nav>
</aside>

<style>
	.active {
		@apply text-primary;
	}
</style>
