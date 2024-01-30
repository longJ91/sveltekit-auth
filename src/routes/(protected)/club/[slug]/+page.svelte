<script lang="ts">
	import type { PageData } from './$types';
	import ClubsForm from '$lib/components/custom-form/club-form.svelte';
	export let data: PageData;
	$: form = data.form;
	const button = 'Update';
</script>

<div class="w-9/12 container flex flex-col items-center space-y-20 sm:justify-between">
	<p class="text-5xl">Update Club</p>
	<ClubsForm {form} {button} />
</div>
