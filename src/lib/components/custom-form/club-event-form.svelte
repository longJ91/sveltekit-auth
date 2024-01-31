<script lang="ts">
	import type { Country } from '$lib/model/response-type';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { clubEventSchema, type ClubEventSchema } from '$lib/config/zod-schemas';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<ClubEventSchema>;
	export let button: string;
	export let countryGroup: Array<Country>;
	export let checkedCountries: string;
	const shopTypeGroup: Array<string> = ['General', 'Part Time'];
</script>

<!-- bind <-> {form} 차이는 상위 컴포넌트에서 공유를 하는지 여부가 다름 -->
<Form.Root method="POST" {form} schema={clubEventSchema} let:config class="w-2/3 space-y-6">
	<Form.Field {config} name="name">
		<Form.Item>
			<Form.Label>Name</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="description">
		<Form.Item>
			<Form.Label>Description</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is description.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="gamecode">
		<Form.Item>
			<Form.Label>Gamecode</Form.Label>
			<Form.Input type="number" />
			<Form.Description>This is gamecode.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="shopType">
		<Form.Item>
			<Form.Label>Shop Type</Form.Label>
			<Form.RadioGroup class="flex flex-col space-y-1">
				{#each shopTypeGroup as shopType}
					<Form.Item class="flex items-center space-x-3 space-y-0">
						<Form.RadioItem value={shopType} id="shopType" />
						<Form.Label>{shopType}</Form.Label>
					</Form.Item>
				{/each}
			</Form.RadioGroup>
			<Form.Description>This is shop type.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="startDate">
		<Form.Item>
			<Form.Label>Start Date</Form.Label>
			<Form.Input type="datetime-local" />
			<Form.Description>This is start date.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="endDate">
		<Form.Item>
			<Form.Label>End Date</Form.Label>
			<Form.Input type="datetime-local" />
			<Form.Description>This is end date.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="registerFrom">
		<Form.Item>
			<Form.Label>Register From</Form.Label>
			<Form.Input type="datetime-local" />
			<Form.Description>This is register from.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="registerTo">
		<Form.Item>
			<Form.Label>Register To</Form.Label>
			<Form.Input type="datetime-local" />
			<Form.Description>This is register to.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="useYn">
		<Form.Item>
			<div class="flex flex-col space-y-3">
				<Form.Label>Use</Form.Label>
				<Form.Switch />
				<Form.Validation />
			</div>
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="body">
		<Form.Item>
			<Form.Label>Body</Form.Label>
			<Form.Textarea placeholder="Event Body" class="resize-none" />
			<Form.Description>This is body.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<!-- TODO - https://github.com/huntabyte/formsnap/issues/27 -->
	<div class="flex flex-col space-y-3">
		<Label>Country</Label>
		<div class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
			{#each countryGroup as country}
				<Checkbox name={country.code} checked={checkedCountries.includes(country.code)} />
				<Label>{country.name}</Label>
			{/each}
		</div>
		<p class="text-sm text-muted-foreground">This is country.</p>
	</div>

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
		on:click={() => goto('/club-event', { replaceState: true })}>Cancel</Button
	>
</Form.Root>
