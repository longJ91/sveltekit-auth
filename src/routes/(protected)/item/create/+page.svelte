<script lang="ts">
	import type { PageData } from './$types';
	import ItemsForm from '$lib/components/custom-form/items-form.svelte';
	export let data: PageData;
	$: form = data.form;
	const serviceType = 'ADMIN_ITEM_IMAGE';
	const button = 'Create';
</script>

<div class="w-9/12 container flex flex-col items-center space-y-20 sm:justify-between">
	<p class="text-5xl">Create Item</p>
	<ItemsForm {form} {serviceType} {button}/>
</div>
