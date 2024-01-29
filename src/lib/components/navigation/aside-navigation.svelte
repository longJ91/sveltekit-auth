<script lang="ts">
	import {
		SunMoon,
		Newspaper,
		Image,
		Link2,
		Calendar,
		Combine,
		Puzzle
	} from 'lucide-svelte';
	import { page } from '$app/stores';

	$: currentPage = $page.url.pathname;
</script>

<aside class="-mx-4 lg:w-1/6 max-w-52">
	<nav class="flex items-start space-x-2 lg:flex-col lg:space-x-4 lg:space-y-4 px-4">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			class="inline-flex items-center rounded-md text-sm font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
		>
			<h4
				class="inline-flex items-center rounded-md text-2xl whitespace-nowrap h-9 px-4 py-2 relative justify-center"
			>
				<span class="pr-20 items-center">Menu</span>
			</h4>
		</a>
		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/club"
			class:active={'club' === currentPage.split('/')[1]}
			><span class="pr-2"><Puzzle /></span>Club</a
		>

		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/notice"
			class:active={'notice' === currentPage.split('/')[1]}
			><span class="pr-2"><Newspaper /></span>Notice</a
		>

		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/banner"
			class:active={'banner' === currentPage.split('/')[1]}
			><span class="pr-2"><Image /></span>Banner</a
		>

		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/club-event"
			class:active={'club-event' === currentPage.split('/')[1]}
			><span class="pr-2"><Link2 /></span>Club Event</a
		>

		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/item"
			class:active={'item' === currentPage.split('/')[1]}
			><span class="pr-2"><SunMoon /></span>Item</a
		>
		<a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/promotion-card-schedule"
			class:active={'promotion-card-schedule' === currentPage.split('/')[1]}
			><span class="pr-2"><Calendar /></span>Promotion Card</a
		>
		<!-- <a
			class="inline-flex items-center rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 relative justify-start hover:bg-transparent"
			href="/sample-table"
			class:active={'sample-table' === currentPage.split('/')[1]}
			><span class="pr-2"><Combine /></span>Migration</a
		> -->
	</nav>
</aside>

<style>
	.active {
		@apply text-primary;
	}
</style>
