<script lang="ts">
	import type { PageData } from './$types';
	import ItemsForm from './items-form.svelte';
	import ImageUploadDialog from './image-upload-dialog.svelte';
	export let data: PageData;
	$: form = data.form;
</script>

<div class="w-9/12 container flex items-center space-x-6 sm:justify-between">
	<ImageUploadDialog bind:form />
	<ItemsForm bind:form />
</div>
