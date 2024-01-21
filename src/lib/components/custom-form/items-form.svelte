<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { onMount } from 'svelte';
	import { formSchema, type FormSchema } from '../../../routes/(protected)/item/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<FormSchema>;
	export let button: string;
	$: url = form.data.url;
</script>

<!-- bind <-> {form} 차이는 상위 컴포넌트에서 공유를 하는지 여부가 다름 -->
<Form.Root method="POST" {form} schema={formSchema} let:config class="w-2/3 space-y-6">
	<Form.Field {config} name="url">
		<Form.Item>
			<Form.Label>Image URL</Form.Label>
			<Form.Input type="string" disabled={true} bind:value={url} />
			<img src={url} alt="" />
			<Form.Description>{url ? 'Uploaded image' : 'No image'}</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<!-- TODO Form.Root 처음 bind 되느 {form} 업데이트 하는 방법 찾으면 아래 hidden url input tag 삭제 -->
	<input type="text" id="url" name="url" class="hidden" bind:value={form.data.url} />
	<Form.Field {config} name="price">
		<Form.Item>
			<Form.Label>Price</Form.Label>
			<Form.Input type="number" />
			<Form.Description>This is item price.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="itemId">
		<Form.Item>
			<Form.Label>Item ID</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is item id.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	{#if button == 'Create'}
		<Form.Button
			class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
			>{button}</Form.Button
		>
	{:else}
		<Form.Button
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>{button}</Form.Button
		>
	{/if}

	<Button
		class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
		on:click={() => goto('/item', { replaceState: true })}>Cancel</Button
	>
</Form.Root>
