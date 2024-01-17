<script lang="ts">
	import type { Banner } from '$lib/model/response-type';
	import { invalidateAll, goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	export let data;
	const banner: Banner = data.banner;

	$: status = banner.status == 'ON' ? true : false;

	function handleToggle() {
		status = !status;
		invalidateAll();
	}

	function handleCancel() {
		goto('/banner', { replaceState: true });
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
				<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">ID</dt>
				<dd class="text-lg font-semibold">{banner.id}</dd>
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
					value={banner.thumbnailUrl}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
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
			{#await data}
				<p>...Loading</p>
			{:then data}
				{#each banner.bannerExposures as bannerExposure, idx}
					<div class="mb-6">

						{bannerExposure.areaDepth}
						{bannerExposure.areaCode}
						{bannerExposure.userClass}

					</div>
				{/each}
			{:catch error}
				<p>오류가 발생했습니다.</p>
			{/await}
		</div>

		<div class="h-10" />

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
