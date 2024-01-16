<script lang="ts">
	import type { Country, BannerExposure } from '$lib/model/response-type';
	import { invalidateAll, goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import * as Select from '$lib/components/ui/select';

	export let data;
	const countries: Array<Country> = data.countries;
	const emptyBannerExposures: Array<BannerExposure> = [];

	$: status = true;
	$: thumbnailUrl = '';
	$: countryGroupHidden = 'hidden';
	$: countryCandidates = emptyBannerExposures;

	function handleToggle() {
		status = !status;
		invalidateAll();
	}

	function clickCountriesButton() {
		countryGroupHidden = countryGroupHidden == 'hidden' ? 'block' : 'hidden';
	}

	function clickCountryButton(countryCode: string) {
		const idx: number = countryCandidates.length;
		const bannerExposure: BannerExposure = {
			areaDepth: 2,
			areaCode: countryCode,
			userClass: 'A,B,C,NONE'
		};
		countryCandidates = countryCandidates.concat(bannerExposure);
		clickCountriesButton();
	}

	function mouseLeaveCountriesButton() {
		countryGroupHidden = 'hidden';
	}

	function handleCancel() {
		history.replaceState({}, '', '/banner');
		invalidateAll();
	}
</script>

<form
	method="POST"
	use:enhance={({ formElement, formData, action, cancel }) => {
		formData.set('status', status ? 'ON' : 'OFF');
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
			<div class="mb-6">
				<label
					for="thumbnail-url"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumbnail Url</label
				>
				<input
					type="text"
					id="thumbnail-url"
					name="thumbnail-url"
					bind:value={thumbnailUrl}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Write your thoughts here..."
				/>
				<img class="h-100 max-w-lg rounded-lg" src={thumbnailUrl} alt="" />
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
			<Select.Root portal={null}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select a Country" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<!-- <Select.Label>Fruits</Select.Label> -->
						{#each countries as country}
							<Select.Item
								value={country.code}
								label={country.name}
								on:click={() => clickCountryButton(country.code)}>{country.name}</Select.Item
							>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="favoriteFruit" />
			</Select.Root>

			{#each countryCandidates as countryCandidate}
				<div class="mb-6">
					<div class="inline-flex items-center">
						{countryCandidate.areaDepth}
						{countryCandidate.areaCode}
						{countryCandidate.userClass}
					</div>
				</div>
			{/each}
		</div>

		<div class="h-10" />

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
