<script lang="ts">
	import { invalidateAll, goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	function handleChange(event: any) {
		// checkedStatus = event.target.value; // 선택된 값을 변수에 저장
	}

	function handleCancel() {
		history.replaceState({}, '', '/notice');
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
				goto('/notice');
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
					for="title"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label
				>
				<input
					type="text"
					id="title"
					name="title"
					value=""
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Write your thoughts here..."
				/>
			</div>
			<div class="mb-6">
				<label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Content</label
				>
				<textarea
					id="content"
					name="content"
					rows="4"
					value=""
					class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Write your thoughts here..."
				/>
			</div>
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
