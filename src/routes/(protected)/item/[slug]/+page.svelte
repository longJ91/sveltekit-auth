<script lang="ts">
	import { invalidateAll, goto } from '$app/navigation';
	import { enhance, applyAction } from '$app/forms';

	export let data;
	let item = data.item;

	function handleChange(event: any) {
		// checkedStatus = event.target.value; // 선택된 값을 변수에 저장
	}

	function handleCancel() {
		history.replaceState({}, '', '/item');
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
				goto('/item');
			}
		};
	}}
>
	<div>
		<div class="flex flex-col justify-center px-6 py-12">
			<div class="flex flex-col pb-3">
				<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">ID</dt>
				<dd class="text-lg font-semibold">{data.item.id}</dd>
			</div>
			<div class="mb-6">
				<label for="image-url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Image Url</label
				>
				<input
					type="text"
					id="default-input"
					name="image-url"
					value={data.item.imageUrl}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div class="mb-6">
				<label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Price</label
				>
				<input
					type="number"
					id="price"
					name="price"
					value={data.item.price}
					aria-describedby="helper-text-explanation"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="1000"
				/>
			</div>
			<div class="mb-6">
				<label for="item-id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Item ID</label
				>
				<input
					type="number"
					id="item-id"
					name="item-id"
					value={data.item.itemId}
					aria-describedby="helper-text-explanation"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="200002087"
				/>
			</div>
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
