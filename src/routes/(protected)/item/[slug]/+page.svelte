<script lang="ts">
	import type { PageData } from './$types';
	import ItemsForm from '$lib/components/custom-form/item-form.svelte';
	export let data: PageData;
	$: form = data.form;
	const serviceType="ADMIN_ITEM_IMAGE"
	const button = 'Update';
</script>

<div class="w-9/12 container flex flex-col items-center space-y-20 sm:justify-between">
	<p class="text-5xl">Update Item</p>
	<ItemsForm {form} {serviceType} {button}/>
</div>