<script lang="ts">
	import type { Country } from '$lib/model/response-type';
	import type { PageData } from './$types';
	import ClubEventForm from '$lib/components/custom-form/club-event-form.svelte';
	export let data: PageData;
	const countryGroup: Array<Country> = data.countryGroup;
    const checkedCountries: string = data.checkedCountries;
	$: form = data.form;
	const button = 'Update';
</script>

<div class="w-9/12 container flex flex-col items-center space-y-20 sm:justify-between">
	<p class="text-5xl">Update Item</p>
	<ClubEventForm {form} {countryGroup} {checkedCountries} {button} />
</div>
