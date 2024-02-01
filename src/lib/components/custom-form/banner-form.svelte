<script lang="ts">
	import type { BannerExposure, Country, Area, Exposure } from '$lib/model/response-type';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { bannerSchema, type BannerSchema } from '$lib/config/zod-schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
	import ImageUploadDialog from '$lib/components/upload/common-image-upload-dialog.svelte';

	export let form: SuperValidated<BannerSchema>;
	export let bannerExposures: Array<BannerExposure> = [];
	export let countryGroup: Array<Country>;
	export let exposureGroup: Array<Exposure> = [];
	export let serviceType: string;
	export let button: string;

	let exposureCount = bannerExposures.length;

	function selectedCountry(idx: number) {
		if (bannerExposures[idx]) {
			const countryCode: string = bannerExposures[idx].countryCode!;
			const name: string = countryGroup.filter((v) => v.code == countryCode).map((v) => v.name)[0];
			return {
				value: countryCode,
				label: name
			};
		} else {
			return {
				value: undefined,
				label: undefined
			};
		}
	}

	function seleteCountry(idx: number, countryCode: string) {
		bannerExposures[idx].countryCode = countryCode;
		bannerExposures[idx].cityAreaCode = '';
		bannerExposures[idx].districtAreaCode = '';
		fetchCityAreas(idx, countryCode);
	}

	const fetchCityAreas = async (idx: number, countryCode?: string) => {
		const response: Response = await fetch('/api/areas?countryCode=' + countryCode, {
			method: 'GET'
		});
		const result: Array<Area> = await response.json();
		exposureGroup[idx].cityAreaGroup = [...result];
		exposureGroup = exposureGroup.with(idx, exposureGroup[idx]);
	};

	function selectedCityArea(idx: number) {
		if (bannerExposures[idx]) {
			const cityAreaCode: string = bannerExposures[idx].cityAreaCode!;
			const name: string = exposureGroup[idx].cityAreaGroup
				.filter((v) => v.code == cityAreaCode)
				.map((v) => v.name)[0];
			return {
				value: cityAreaCode,
				label: name
			};
		} else {
			return {
				value: undefined,
				label: undefined
			};
		}
	}

	function selectCityArea(idx: number, cityArea: Area) {
		bannerExposures[idx].cityAreaCode = cityArea.code;
		bannerExposures[idx].districtAreaCode = '';
		fetchDistirctAraes(idx, cityArea);
	}

	const fetchDistirctAraes = async (idx: number, arae: Area) => {
		const response: Response = await fetch(
			'/api/areas?countryCode=' + arae.parentCode + '&areaCode=' + arae.code,
			{
				method: 'GET'
			}
		);
		const result: Array<Area> = await response.json();
		exposureGroup[idx].districtAreaGroup = [...result];
		exposureGroup = exposureGroup.with(idx, exposureGroup[idx]);
	};

	function selectedDistrictArea(idx: number) {
		if (bannerExposures[idx]) {
			const districtAreaCode: string = bannerExposures[idx].districtAreaCode!;
			const name: string = exposureGroup[idx].districtAreaGroup
				.filter((v) => v.code == districtAreaCode)
				.map((v) => v.name)[0];

			return {
				value: districtAreaCode,
				label: name
			};
		} else {
			return {
				value: undefined,
				label: undefined
			};
		}
	}

	function addExposure() {
		bannerExposures = bannerExposures.concat({
			countryCode: '',
			cityAreaCode: '',
			districtAreaCode: '',
			userClass: 'A,B,C,NONE'
		});
		exposureGroup = exposureGroup.concat({
			id: exposureGroup.length == 0 ? 0 : exposureGroup[exposureGroup.length - 1].id + 1,
			countryGroup,
			cityAreaGroup: [],
			districtAreaGroup: [],
			userClass: 'A,B,C,NONE'
		});
		exposureCount++;
	}

	function removeExposure(targetIdx: number) {
		exposureGroup = exposureGroup.filter((value, idx) => idx != targetIdx);
		if (bannerExposures[targetIdx]) {
			bannerExposures = bannerExposures.filter((value, idx) => idx != targetIdx);
		}
		exposureCount--;
	}
</script>

<!-- bind <-> {form} 차이는 상위 컴포넌트에서 공유를 하는지 여부가 다름 -->
<Form.Root method="POST" {form} schema={bannerSchema} let:config class="w-2/3 space-y-6">
	{#if button == 'Update'}
		<Form.Field {config} name="id">
			<Form.Item>
				<Form.Label>ID</Form.Label>
				<Form.Input type="text" disabled />
			</Form.Item>
		</Form.Field>
	{/if}
	<Form.Field {config} name="thumbnailUrl">
		<Form.Item>
			<Form.Label>Thumbnail Image Url</Form.Label>
			<Form.Input type="text" value={form.data.thumbnailUrl} />
			<Form.Description>This is thumbnail url.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<ImageUploadDialog bind:url={form.data.thumbnailUrl} {serviceType} />
	<Form.Field {config} name="linkUrl">
		<Form.Item>
			<Form.Label>Link Url</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is link url.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="status">
		<Form.Item>
			<div class="flex flex-col space-y-3">
				<Form.Label>Status</Form.Label>
				<Form.Switch />
				<Form.Validation />
			</div>
		</Form.Item>
	</Form.Field>
	<div class="space-y-4">
		<div class="mb-6">
			<Label for="exposure" class="block mb-4">Exposure</Label>
			<Button on:click={addExposure}>추가</Button>
		</div>
		{#each exposureGroup as exposure, idx (exposure.id)}
			<div class="flex justify-between space-x-6">
				<Select.Root selected={selectedCountry(idx)}>
					<Select.Trigger class="w-[260px]">
						<Select.Value placeholder="Country" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each countryGroup as country}
								<Select.Item
									value={country.code}
									label={country.name}
									on:click={() => seleteCountry(idx, country.code)}>{country.name}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name={idx + '-country-code'} />
				</Select.Root>

				<Select.Root selected={selectedCityArea(idx)}>
					<Select.Trigger class="w-[300px]">
						<Select.Value placeholder="City Area" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each exposureGroup[idx].cityAreaGroup as cityArea}
								<Select.Item
									value={cityArea.code}
									label={cityArea.name}
									on:click={() => selectCityArea(idx, cityArea)}>{cityArea.name}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name={idx + '-city-area-code'} />
				</Select.Root>

				<Select.Root selected={selectedDistrictArea(idx)}>
					<Select.Trigger class="w-[300px]">
						<Select.Value placeholder="District Area" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each exposureGroup[idx].districtAreaGroup as districtArea}
								<Select.Item
									value={districtArea.code}
									label={districtArea.name}
									on:click={() => (bannerExposures[idx].districtAreaCode = districtArea.code)}
									>{districtArea.name}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name={idx + '-district-area-code'} />
				</Select.Root>

				<Input
					class="w-[300px]"
					name={idx + '-user-class'}
					bind:value={exposureGroup[idx].userClass}
				/>

				<div class="flex flex-1 items-center justify-end">
					<Button class="items-rigth" on:click={() => removeExposure(idx)}>X</Button>
				</div>
			</div>
		{/each}
	</div>
	<Form.Field {config} name="sequence">
		<!-- <Form.Item>
			<Form.Label>Sequence</Form.Label>
			<Form.Input type="number" value={form.data.thumbnailUrl} />
			<Form.Description>This is sequence.</Form.Description>
			<Form.Validation />
		</Form.Item> -->
	</Form.Field>
	<Form.Field {config} name="createDate">
		<!-- <Form.Item>
			<Form.Label>Create Date</Form.Label>
			<Form.Input type="datetime-local" disabled={button == 'Update'} />
			<Form.Description>This is create date. (base on UTC)</Form.Description>
			<Form.Validation />
		</Form.Item> -->
	</Form.Field>
	<Form.Field {config} name="updateDate">
		<!-- <Form.Item>
			<Form.Label>Update Date</Form.Label>
			<Form.Input type="datetime-local" disabled={button == 'Update'} />
			<Form.Description>This is update date. (base on UTC)</Form.Description>
			<Form.Validation />
		</Form.Item> -->
	</Form.Field>
	<Input class="hidden" name="banner-exposure-count" bind:value={exposureCount} />

	<div class="flex justify-end mt-6">
		<Button
			class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
			on:click={() => goto('/banner', { replaceState: true })}>Cancel</Button
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
