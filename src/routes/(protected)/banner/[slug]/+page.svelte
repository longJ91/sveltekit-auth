<script lang="ts">
	import type { Banner, Country, Area } from '$lib/model/response-type';
	import { invalidateAll, goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import ImageUploadDialog from '$lib/components/upload/banner-upload-dialog.svelte';
	import { onMount } from 'svelte';

	const serviceType = 'ADMIN_BANNER_THUMBNAIL';

	export let data;

	const countries: Array<Country> = data.countries;
	const banner: Banner = data.banner;

	$: status = banner.status == 'ON' ? true : false;
	$: thumbnailUrl = '';
	$: exposureGroup = data.exposureGroup;
	$: exposureCount = data.exposureGroup.length;

	const fetchCityAreas = async (idx: number, countryCode?: string) => {
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

	function handleToggle() {
		status = !status;
		invalidateAll();
	}

	function addExposure() {
		exposureGroup = exposureGroup.concat({
			id: exposureGroup[exposureGroup.length - 1].id + 1,
			countyGroup: countries,
			cityAreaGroup: [],
			districtAreaGroup: [],
			userClass: 'A,B,C,NONE'
		});
		exposureCount++;
	}

	function seleteCountry(idx: number, countryCode: string) {
		fetchCityAreas(idx, countryCode);
	}

	function selectCityArea(idx: number, cityArea: Area) {
		fetchDistirctAraes(idx, cityArea);
	}

	function removeExposure(targetIdx: number) {
		exposureGroup = exposureGroup.filter((value, idx) => idx != targetIdx);
		if (banner.bannerExposures[targetIdx]) {
			banner.bannerExposures = banner.bannerExposures.filter((value, idx) => idx != targetIdx);
		}
		exposureCount--;
	}

	function handleCancel() {
		goto('/banner', { replaceState: true });
	}

	function selectedCountry(idx: number) {
		if (banner.bannerExposures[idx]) {
			const countryCode: string = banner.bannerExposures[idx].countryCode!;
			const name: string = exposureGroup[idx].countyGroup
				.filter((v) => v.code == countryCode)
				.map((v) => v.name)[0];
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

	function selectedCityArea(idx: number) {
		if (banner.bannerExposures[idx]) {
			const cityAreaCode: string = banner.bannerExposures[idx].cityAreaCode!;
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

	function selectedDistrictArea(idx: number) {
		if (banner.bannerExposures[idx]) {
			const districtAreaCode: string = banner.bannerExposures[idx].districtAreaCode!;
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

	onMount(() => {
		thumbnailUrl = banner.thumbnailUrl;
	});
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
				<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">ID</dt>
				<dd class="text-lg font-semibold">{banner.id}</dd>
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
					value={thumbnailUrl}
					disabled
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
					value={banner.linkUrl}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div class="mb-6">
				<label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Status</label
				>
				<label class="relative inline-flex items-center cursor-pointer">
					{#if banner.status == 'ON'}
						<input
							type="checkbox"
							id="status"
							name="status"
							value="ON"
							class="sr-only peer"
							checked
							on:click={handleToggle}
						/>
					{:else}
						<input
							type="checkbox"
							id="status"
							name="status"
							value="OFF"
							class="sr-only peer"
							on:click={handleToggle}
						/>
					{/if}
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

			{#each exposureGroup as exposure, idx (exposure.id)}
				<div class="mb-4">
					<div class="flex gap-4">
						<Select.Root portal={null} preventScroll={false} selected={selectedCountry(idx)}>
							<Select.Trigger class="w-[260px]">
								<Select.Value placeholder="Country" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each exposure.countyGroup as country}
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

						<Select.Root portal={null} preventScroll={false} selected={selectedCityArea(idx)}>
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

						<Select.Root portal={null} preventScroll={false} selected={selectedDistrictArea(idx)}>
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
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>Update</button
			>
			<button
				type="button"
				class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
				on:click={handleCancel}>Cancel</button
			>
		</div>
	</div>
</form>
