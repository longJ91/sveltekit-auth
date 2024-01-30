<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { clubSchema, type ClubSchema } from '$lib/config/zod-schemas';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<ClubSchema>;
	export let button: string;

	const statusGroup: Array<string> = ['REQUESTED', 'APPROVED', 'DENIED', 'CANCELD', 'DELETED'];
</script>

<!-- bind <-> {form} 차이는 상위 컴포넌트에서 공유를 하는지 여부가 다름 -->
<Form.Root method="POST" {form} schema={clubSchema} let:config class="w-2/3 space-y-6">
	<Form.Field {config} name="id">
		<Form.Item>
			<Form.Label>ID</Form.Label>
			<Form.Input type="text" disabled />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="name">
		<Form.Item>
			<Form.Label>Name</Form.Label>
			<Form.Input type="text" disabled />
			<Form.Description>This is name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="description">
		<Form.Item>
			<Form.Label>Description</Form.Label>
			<Form.Input type="text" disabled />
			<Form.Description>This is description.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="status">
		<Form.Item>
			<Form.Label>Status</Form.Label>
			<Form.RadioGroup class="flex flex-col space-y-1">
				{#each statusGroup as status}
					<Form.Item class="flex items-center space-x-3 space-y-0">
						<Form.RadioItem value={status} id="event" />
						<Form.Label>{status}</Form.Label>
					</Form.Item>
				{/each}
			</Form.RadioGroup>
			<Form.Description>This is status.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="createDate">
		<Form.Item>
			<Form.Label>Create Date</Form.Label>
			<Form.Input type="datetime-local" disabled />
			<Form.Description>This is create date. (base on UTC)</Form.Description>
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
		on:click={() => goto('/club', { replaceState: true })}>Cancel</Button
	>
</Form.Root>
