<script lang="ts">
	import type { BannerExposure, Country, Exposure } from '$lib/model/response-type';
	import type { PageData } from './$types';
	import BannerForm from '$lib/components/custom-form/banner-form.svelte';

	export let data: PageData;
	$: form = data.form;

	const bannerExposures: Array<BannerExposure> = data.bannerExposures;
	const countryGroup: Array<Country> = data.countryGroup;
	const exposureGroup: Array<Exposure> = data.exposureGroup;
	const serviceType = 'ADMIN_BANNER_THUMBNAIL';
	const button = 'Update';
</script>

<div class="w-9/12 container flex flex-col items-center space-y-20 sm:justify-between">
	<p class="text-5xl">Update Banner</p>
	<BannerForm {form} {countryGroup} {bannerExposures} {exposureGroup} {serviceType} {button} />
</div>
