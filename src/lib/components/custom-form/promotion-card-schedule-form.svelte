<script lang="ts">
	import type { Country } from '$lib/model/response-type';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import {
		promotionCardScheduleSchema,
		type PromotionCardScheduleSchema
	} from '$lib/config/zod-schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
	import ImageUploadDialog from '$lib/components/upload/common-image-upload-dialog.svelte';

	export let form: SuperValidated<PromotionCardScheduleSchema>;
	export let countries: Array<Country>;
	export let button: string;
	export let serviceType: string;
	$: url = '';
</script>

<!-- bind <-> {form} 차이는 상위 컴포넌트에서 공유를 하는지 여부가 다름 -->
<Form.Root
	method="POST"
	{form}
	schema={promotionCardScheduleSchema}
	let:config
	class="w-2/3 space-y-6"
>
	<Form.Field {config} name="countryCode">
		<Form.Item>
			<Form.Label>Country Code</Form.Label>
			<Form.Select>
				<Form.SelectTrigger placeholder="Select a country code" />
				<Form.SelectContent>
					{#each countries as country}
						<Form.SelectItem value={country.code}>{country.name}</Form.SelectItem>
					{/each}
				</Form.SelectContent>
			</Form.Select>
			<Form.Description>This is country code.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="type">
		<Form.Item>
			<Form.Label>Type</Form.Label>
			<Form.RadioGroup class="flex flex-col space-y-1">
				<Form.Item class="flex items-center space-x-3 space-y-0">
					<Form.RadioItem value="EVENT" id="event" />
					<Form.Label>EVENT</Form.Label>
				</Form.Item>
				<Form.Item class="flex items-center space-x-3 space-y-0">
					<Form.RadioItem value="COMPETITION" id="competition" />
					<Form.Label>COMPETITION</Form.Label>
				</Form.Item>
			</Form.RadioGroup>
			<Form.Description>This is category.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="category">
		<Form.Item>
			<Form.Label>Category</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is category.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="title">
		<Form.Item>
			<Form.Label>Title</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is title.</Form.Description>
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
	<Form.Field {config} name="isDisplay">
		<Form.Item>
			<div class="flex flex-col space-y-3">
				<Form.Label>Display</Form.Label>
				<Form.Switch />
				<Form.Validation />
			</div>
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="linkUrl">
		<Form.Item>
			<Form.Label>Link Url</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is link url.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="backgroundImageUrl">
		<Form.Item>
			<Form.Label>Background Image Url</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is background image url.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	{#if url == ''}
		<ImageUploadDialog bind:url {serviceType} />
	{/if}
	<Form.Field {config} name="symbolImageUrl">
		<Form.Item>
			<Form.Label>Symbol Image Url</Form.Label>
			<Form.Input type="text" bind:value={url} />
			<Form.Description>This is symbolImage url.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="pushType">
		<Form.Item>
			<Form.Label>Push Type</Form.Label>
			<Form.Input type="number" />
			<Form.Description>This is push type.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="pushValue">
		<Form.Item>
			<Form.Label>Push Value</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is push.</Form.Description>
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
		on:click={() => goto('/promotion-card-schedule', { replaceState: true })}>Cancel</Button
	>
</Form.Root>
