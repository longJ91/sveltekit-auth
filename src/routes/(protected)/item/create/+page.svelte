<script lang="ts">
	import type { PageData } from './$types';
	import ItemsForm from '$lib/components/custom-form/items-form.svelte';
	import ImageUploadDialog from '$lib/components/upload/image-upload-dialog.svelte';
	export let data: PageData;
	$: form = data.form;
	const serviceType = 'ADMIN_ITEM_IMAGE';
	const button = 'Create';
</script>

<div class="w-9/12 container flex flex-col items-center space-x-6 sm:justify-between">
	<ImageUploadDialog bind:form {serviceType} />
	<ItemsForm bind:form {button} />
</div>
