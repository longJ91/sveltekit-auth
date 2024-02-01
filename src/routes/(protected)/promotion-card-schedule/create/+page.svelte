<script lang="ts">
	import type { Country } from '$lib/model/response-type';
	import type { PageData } from './$types';
	import PromotionCardSchedulesForm from '$lib/components/custom-form/promotion-card-schedule-form.svelte';
	export let data: PageData;
	$: form = data.form;
	const countries: Array<Country> = data.countries;
	const serviceType = 'ADMIN_PROMOTION_CARD_SYMBOL';
	const button = 'Create';
</script>

<div class="w-9/12 container flex flex-col items-center space-y-20 sm:justify-between">
	<p class="text-5xl">Create Promotion Card Schedule</p>
	<PromotionCardSchedulesForm {form} countryGroup={countries} {serviceType} {button} />
</div>