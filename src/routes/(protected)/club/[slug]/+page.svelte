<script lang="ts">
	import { invalidateAll, goto } from '$app/navigation';
	import { enhance, applyAction } from '$app/forms';

	export let data;
	let club = data.club;

	$: checkedStatus = club.status;

	function handleChange(event: any) {
		checkedStatus = event.target.value; // 선택된 값을 변수에 저장
	}

	function handleCancel() {
		history.replaceState({}, '', '/club');
		invalidateAll();
	}
</script>

<form
	method="POST"
	use:enhance={({ formElement, formData, action, cancel }) => {
		return async ({ result }) => {
			// `result` is an `ActionResult` object
			if (result.type === 'redirect') {
				goto(result.location);
			} else {
				goto('/club');
			}
		};
	}}
>
	<div>
		<div class="flex justify-center">
			<dl
				class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
			>
				<div class="flex flex-col pb-3">
					<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">ID</dt>
					<dd class="text-lg font-semibold">{data.club.id}</dd>
				</div>
				<div class="flex flex-col py-3">
					<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
					<dd class="text-lg font-semibold">{data.club.name}</dd>
				</div>
				<div class="flex flex-col pt-3">
					<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Description</dt>
					<dd class="text-lg font-semibold">{data.club.description}</dd>
				</div>
				<div class="flex flex-col pt-3">
					<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Status</dt>
					<dd class="text-lg font-semibold">
						<div class="flex items-center mb-4">
							{#if checkedStatus == 'REQUESTED'}
								<input
									checked
									id="requested-radio-1"
									type="radio"
									value="REQUESTED"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{:else}
								<input
									id="requested-radio-1"
									type="radio"
									value="REQUESTED"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{/if}
							<label
								for="default-radio-1"
								class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">REQUESTED</label
							>
							<div class="ms-2" />
							{#if checkedStatus == 'APPROVED'}
								<input
									checked
									id="approved-radio-1"
									type="radio"
									value="APPROVED"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{:else}
								<input
									id="approved-radio-1"
									type="radio"
									value="APPROVED"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{/if}
							<label
								for="default-radio-1"
								class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">APPROVED</label
							>
							<div class="ms-2" />
							{#if checkedStatus == 'DENIED'}
								<input
									checked
									id="denied-radio-1"
									type="radio"
									value="DENIED"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{:else}
								<input
									id="denied-radio-1"
									type="radio"
									value="DENIED"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{/if}
							<label
								for="default-radio-1"
								class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">DENIED</label
							>
							<div class="ms-2" />
							{#if checkedStatus == 'CANCELD'}
								<input
									checked
									id="canceld-radio-1"
									type="radio"
									value="CANCELD"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{:else}
								<input
									id="canceld-radio-1"
									type="radio"
									value="CANCELD"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{/if}
							<label
								for="default-radio-1"
								class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">CANCELD</label
							>
							<div class="ms-2" />
							{#if checkedStatus == 'DELETED'}
								<input
									checked
									id="deleted-radio-1"
									type="radio"
									value="DELETED"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{:else}
								<input
									id="deleted-radio-1"
									type="radio"
									value="DELETED"
									name="default-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									on:click={handleChange}
								/>
							{/if}
							<label
								for="default-radio-1"
								class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">DELETED</label
							>
						</div>
					</dd>
				</div>
			</dl>
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
