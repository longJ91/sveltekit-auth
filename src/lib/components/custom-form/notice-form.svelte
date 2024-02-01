<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { noticeSchema, type NoticeSchema } from '$lib/config/zod-schemas';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<NoticeSchema>;
	export let button: string;
</script>

<!-- bind <-> {form} 차이는 상위 컴포넌트에서 공유를 하는지 여부가 다름 -->
<Form.Root method="POST" {form} schema={noticeSchema} let:config class="w-2/3 space-y-6">
	{#if button == 'Update'}
		<Form.Field {config} name="id">
			<Form.Item>
				<Form.Label>ID</Form.Label>
				<Form.Input type="text" disabled />
			</Form.Item>
		</Form.Field>
	{/if}
	<Form.Field {config} name="title">
		<Form.Item>
			<Form.Label>Title</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is title.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="content">
		<Form.Item>
			<Form.Label>Content</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is content.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="createDate">
		<Form.Item>
			<Form.Label>Create Date</Form.Label>
			<Form.Input type="datetime-local" disabled={button == 'Update'} />
			<Form.Description>This is create date. (base on UTC)</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="updateDate">
		<Form.Item>
			<Form.Label>Update Date</Form.Label>
			<Form.Input type="datetime-local" disabled={button == 'Update'} />
			<Form.Description>This is update date. (base on UTC)</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<div class="flex justify-end mt-6">
		<Button
			class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
			on:click={() => goto('/notice', { replaceState: true })}>Cancel</Button
		>
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
	</div>
</Form.Root>
