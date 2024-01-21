<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	export let data: any;

	let pages: Array<number> = [];

	for (let i = 0; i < data.noticeInfoResponse.totalPage; i++) {
		pages.push(i + 1);
	}

	const windowSize = data.noticeInfoResponse.windowSize;
	
	$: previousPage =
		data.noticeInfoResponse.currentPage < 2 ? 1 : data.noticeInfoResponse.currentPage - 1;
	$: nextPage =
		data.noticeInfoResponse.currentPage >= data.noticeInfoResponse.totalPage
			? data.noticeInfoResponse.totalPage
			: data.noticeInfoResponse.currentPage + 1;
	$: showingFirstIndex = 1 + (data.noticeInfoResponse.currentPage - 1) * windowSize;
	$: showingLastIndex =
		data.noticeInfoResponse.currentPage == data.noticeInfoResponse.totalPage
			? data.noticeInfoResponse.totalCount
			: data.noticeInfoResponse.currentPage * windowSize;
</script>

<div class="flex justify-center">
	<h1
		class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
	>
		공시자항 관리
	</h1>
</div>

<div class="flex justify-between pt-4">
	<br />
	<button
		type="button"
		class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
		on:click={() =>
			goto('/notice/create', {
				invalidateAll: true
			})}>Create</button
	>
</div>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> # </th>
				<th scope="col" class="px-6 py-3"> Title </th>
				<th scope="col" class="px-6 py-3"> Content </th>
				<th scope="col" class="px-6 py-3">
					<div class="flex items-center">
						Create Date
						<!-- <svg
							class="w-3 h-3 ms-1.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
							/>
						</svg> -->
					</div>
				</th>
				<th scope="col" class="px-6 py-3">
					<div class="flex items-center">
						Update Date
						<!-- <svg
							class="w-3 h-3 ms-1.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
							/>
						</svg> -->
					</div>
				</th>
				<th scope="col" class="px-6 py-3">
					<p class="text-center">Action</p>
				</th>
			</tr>
		</thead>
		<tbody>
			{#await data}
				<p>...Loading</p>
			{:then data}
				{#each data.noticeInfoResponse.notices as notice, idx}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							{idx + 1}
						</th>
						<td class="px-6 py-4"> {notice.title} </td>
						<td class="px-6 py-4">
							{notice.content.length > 20
								? notice.content.substring(0, 20) + '...'
								: notice.content}</td
						>
						<td class="px-6 py-4"> {new Date(notice.createDate)} </td>
						<td class="px-6 py-4"> {new Date(notice.updateDate)} </td>
						<td class="px-6 py-4 text-center">
							<a
								href="/notice/{notice.id}"
								class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a
							>
						</td>
					</tr>
				{/each}
			{:catch error}
				<p>오류가 발생했습니다.</p>
			{/await}
		</tbody>
	</table>

	<nav
		class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
		aria-label="Table navigation"
	>
		<span
			class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"
			>Showing
			{#if data.noticeInfoResponse.totalCount < 1}
				<span class="font-semibold text-gray-900 dark:text-white">0</span>
			{:else}
				<span class="font-semibold text-gray-900 dark:text-white"
					>{showingFirstIndex}-{showingLastIndex}</span
				>
				of
				<span class="font-semibold text-gray-900 dark:text-white"
					>{data.noticeInfoResponse.totalCount}</span
				>
			{/if}
		</span>
		<ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
			<li>
				<a
					href="/notice?page={previousPage}&windowSize={windowSize}"
					class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					<span class="sr-only">Previous</span>
					<svg
						class="w-2.5 h-2.5 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 6 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 1 1 5l4 4"
						/>
					</svg>
				</a>
			</li>

			{#await data}
				<p>...Loading</p>
			{:then data}
				{#each pages as page}
					{#if page == data.noticeInfoResponse.currentPage}
						<li>
							<a
								href="/notice?page={page}&windowSize={windowSize}"
								class="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
								>{page}</a
							>
						</li>
					{:else}
						<li>
							<a
								href="/notice?page={page}&windowSize={windowSize}"
								class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>{page}</a
							>
						</li>
					{/if}
				{/each}
			{:catch error}
				<p>오류가 발생했습니다.</p>
			{/await}

			<li>
				<a
					href="/notice?page={nextPage}&windowSize={windowSize}"
					class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					<span class="sr-only">Next</span>
					<svg
						class="w-2.5 h-2.5 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 6 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 9 4-4-4-4"
						/>
					</svg>
				</a>
			</li>
		</ul>
	</nav>
</div>
