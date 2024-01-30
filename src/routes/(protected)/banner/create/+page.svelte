<script lang="ts">
	import type { Country, Area } from '$lib/model/response-type';
	import { invalidateAll, goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import ImageUploadDialog from '$lib/components/upload/banner-upload-dialog.svelte';

	const serviceType = 'ADMIN_BANNER_THUMBNAIL';

	type Exposure = {
		countyGroup: Array<Country>;
		cityAreaGroup: Array<Area>;
		districtAreaGroup: Array<Area>;
		userClass: string;
	};

	export let data;

	const countries: Array<Country> = data.countries;
	const emptyExposureGroup: Array<Exposure> = [];

	const fetchCityAreas = async (idx: number, countryCode: string) => {
		const response: Response = await fetch('/api/areas?countryCode=' + countryCode, {
			method: 'GET'
		});
		const result: Array<Area> = await response.json();
		exposureGroup[idx].cityAreaGroup = [...result];
		exposureGroup = exposureGroup.with(idx, exposureGroup[idx]);
	};

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

	$: status = true;
	$: thumbnailUrl = '';
	$: exposureGroup = emptyExposureGroup;
	$: exposureCount = exposureGroup.length;

	function handleToggle() {
		status = !status;
		invalidateAll();
	}

	function addExposure() {
		exposureGroup = exposureGroup.concat({
			countyGroup: countries,
			cityAreaGroup: [],
			districtAreaGroup: [],
			userClass: 'A,B,C,NONE'
		});
	}

	async function seleteCountry(idx: number, countryCode: string) {
		await fetchCityAreas(idx, countryCode);
	}

	function selectCityArea(idx: number, cityArea: Area) {
		fetchDistirctAraes(idx, cityArea);
	}

	function removeExposure(targetIdx: number) {
		exposureGroup = exposureGroup.filter((value, idx) => idx != targetIdx);
	}

	function handleCancel() {
		goto('/banner', { replaceState: true });
	}
</script>

<form
	method="POST"
	use:enhance={({ formElement, formData, action, cancel }) => {
		formData.set('status', status ? 'ON' : 'OFF');
		formData.set('thumbnail-url', thumbnailUrl);
		return async ({ result }) => {
			// `result` is an `ActionResult` object
			if (result.type === 'redirect') {
				goto(result.location);
			} else {
				goto('/banner');
			}
		};
	}}
>
	<div>
		<div class="flex flex-col justify-center px-6 py-12">
			<div class="flex flex-col pb-3">
				<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">#</dt>
			</div>
			<div class="mb-6 space-y-4">
				<label
					for="thumbnail-url"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumbnail Url</label
				>
				<input
					type="text"
					id="thumbnail-url"
					name="thumbnail-url"
					bind:value={thumbnailUrl}
					disabled
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Write your thoughts here..."
				/>
				<img class="h-100 max-w-lg rounded-lg" src={thumbnailUrl} alt="" />
				<ImageUploadDialog bind:thumbnailUrl {serviceType} />
			</div>
			<div class="mb-6">
				<label for="link-url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Link Url</label
				>
				<input
					type="text"
					id="link-url"
					name="link-url"
					value=""
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Write your thoughts here..."
				/>
			</div>
			<div class="mb-6 py-5 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3">
				<label for="link-url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Status</label
				>
				<label class="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						id="status"
						name="status"
						value="ON"
						class="sr-only peer"
						checked
						on:click={handleToggle}
					/>
					<div
						class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
					/>
					<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
						>{status ? 'ON' : 'OFF'}</span
					>
				</label>
			</div>

			<div class="mb-6">
				<Label for="exposure" class="block mb-4">Exposure</Label>
				<Button on:click={addExposure}>추가</Button>
			</div>

			{#each exposureGroup as exposure, idx}
				<div class="mb-4">
					<div class="flex gap-4">
						<Select.Root portal={null} preventScroll={false}>
							<Select.Trigger class="w-[260px]">
								<Select.Value placeholder="Country" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each exposure.countyGroup as country}
										<Select.Item
											value={country.code}
											label={country.name}
											on:click={async () => await seleteCountry(idx, country.code)}
											>{country.name}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name={idx + '-country-code'} />
						</Select.Root>

						<Select.Root portal={null} preventScroll={false}>
							<Select.Trigger class="w-[300px]">
								<Select.Value placeholder="City Area" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each exposure.cityAreaGroup as cityArea}
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

						<Select.Root portal={null} preventScroll={false}>
							<Select.Trigger class="w-[300px]">
								<Select.Value placeholder="District Area" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each exposure.districtAreaGroup as districtArea}
										<Select.Item value={districtArea.code} label={districtArea.name}
											>{districtArea.name}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name={idx + '-district-area-code'} />
						</Select.Root>

						<Input class="w-[300px]" name={idx + '-user-class'} bind:value={exposure.userClass} />

						<div class="flex flex-1 items-center justify-end">
							<Button class="items-rigth" on:click={() => removeExposure(idx)}>X</Button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<Input class="hidden" name="banner-exposure-count" bind:value={exposureCount} />

		<div class="flex justify-center">
			<button
				type="submit"
				class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				>Create</button
			>
			<button
				type="button"
				class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
				on:click={handleCancel}>Cancel</button
			>
		</div>
	</div>
</form>
