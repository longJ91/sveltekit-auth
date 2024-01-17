<script lang="ts">
	import { invalidateAll, goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	$: status = true;
	$: checkedShopType = 0;
	$: countryGroupHidden = 'hidden';
	$: countryCodes = '';

	function handleToggle() {
		status = !status;
		invalidateAll();
	}

	function handleChange(value: number) {
		checkedShopType = value;
	}

	function handleCountryButton() {
		countryGroupHidden = countryGroupHidden == 'hidden' ? '' : 'hidden';
	}

	function addCountryCode(value: string) {
		const countryCode: string = value;
		if (countryCode == 'ALL') {
			countryCodes = 'KR,HK,CN,US,JP,ES';
		} else {
			if (!countryCodes.includes(countryCode)) {
				if (countryCodes.length == 0) countryCodes = countryCodes.concat(countryCode);
				else countryCodes = countryCodes.concat(',' + countryCode);
			}
		}

		handleCountryButton();
	}

	function handleCancel() {
		goto('/club-event', { replaceState: true });
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
				goto('/club-event');
			}
		};
	}}
>
	<div>
		<div class="flex flex-col justify-center px-6 py-12">
			<div class="mb-6">
				<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Name</label
				>
				<input
					type="text"
					id="name"
					name="name"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div class="mb-6">
				<label
					for="description"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label
				>
				<input
					type="text"
					id="description"
					name="description"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div class="mb-6">
				<label
					for="shop-type-radio"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shop Type</label
				>
				<div class="flex items-center mb-4">
					{#if checkedShopType == 0}
						<input
							checked
							id="shop-type-radio-0"
							type="radio"
							value={checkedShopType}
							name="shop-type-radio-0"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							on:click={() => handleChange(0)}
						/>
					{:else}
						<input
							id="shop-type-radio-0"
							type="radio"
							value={checkedShopType}
							name="shop-type-radio-0"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							on:click={() => handleChange(0)}
						/>
					{/if}

					<label
						for="shop-type-radio-0"
						class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">General Type</label
					>
				</div>
				<div class="flex items-center">
					{#if checkedShopType == 1}
						<input
							checked
							id="shop-type-radio-1"
							type="radio"
							value={checkedShopType}
							name="shop-type-radio-1"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							on:click={() => handleChange(1)}
						/>
					{:else}
						<input
							id="shop-type-radio-1"
							type="radio"
							value={checkedShopType}
							name="shop-type-radio-1"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							on:click={() => handleChange(1)}
						/>
					{/if}

					<label
						for="shop-type-radio-1"
						class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Part Time Type</label
					>
				</div>
			</div>

			<div class="mb-6">
				<label for="start-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Start Date</label
				>
				<input
					type="datetime-local"
					id="start-date"
					name="start-date"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div class="mb-6">
				<label for="end-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>End Date</label
				>
				<input
					type="datetime-local"
					id="end-date"
					name="end-date"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div class="mb-6">
				<label
					for="register-from"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Register From</label
				>
				<input
					type="datetime-local"
					id="register-from"
					name="register-from"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div class="mb-6">
				<label
					for="register-to"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Register To</label
				>
				<input
					type="datetime-local"
					id="register-to"
					name="register-to"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div class="mb-6">
				<label for="use-y-n" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Use</label
				>
				<label class="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						id="use-y-n"
						name="use-y-n"
						value="Y"
						class="sr-only peer"
						checked
						on:click={handleToggle}
					/>
					<div
						class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
					/>
					<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
						>{status ? 'Y' : 'N'}</span
					>
				</label>
			</div>
			<div class="mb-6">
				<label
					for="countryCodes"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Countries</label
				>
				<div class="flex">
					<div class={countryGroupHidden == '' ? 'hidden' : ''}>
						<button
							id="states-button"
							data-dropdown-toggle="dropdown-states"
							class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
							type="button"
							on:click={handleCountryButton}
						>
							Countries
							<svg
								class="w-2.5 h-2.5 ms-2.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</button>
					</div>

					<div
						id="dropdown-states"
						class="z-10 {countryGroupHidden} bg-white divide-y divide-gray-100 rounded-s-lg shadow w-44 dark:bg-gray-700"
					>
						<ul
							class="py-2 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="states-button"
						>
							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									on:click={() => addCountryCode('ALL')}
								>
									<div class="inline-flex items-center">
										<img
											alt="지구"
											src="//upload.wikimedia.org/wikipedia/commons/1/1e/Earth.png"
											decoding="async"
											width="22"
											height="15"
											class="h-4.5 w-4.5 me-2"
											srcset="//upload.wikimedia.org/wikipedia/commons/1/1e/Earth.png"
											data-file-width="900"
											data-file-height="600"
										/>
										All
									</div>
								</button>
							</li>
							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									on:click={() => addCountryCode('KR')}
								>
									<div class="inline-flex items-center">
										<img
											alt="대한민국의 기"
											src="//upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/22px-Flag_of_South_Korea.svg.png"
											decoding="async"
											width="22"
											height="15"
											class="h-4.5 w-4.5 me-2"
											srcset="//upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/33px-Flag_of_South_Korea.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/44px-Flag_of_South_Korea.svg.png 2x"
											data-file-width="900"
											data-file-height="600"
										/>
										Korea (KR)
									</div>
								</button>
							</li>
							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									on:click={() => addCountryCode('HK')}
								>
									<div class="inline-flex items-center">
										<img
											alt="홍콩의 기"
											src="//upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Hong_Kong.svg/22px-Flag_of_Hong_Kong.svg.png"
											decoding="async"
											width="22"
											height="15"
											class="h-4.5 w-4.5 me-2"
											srcset="//upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Hong_Kong.svg/33px-Flag_of_Hong_Kong.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Hong_Kong.svg/44px-Flag_of_Hong_Kong.svg.png 2x"
											data-file-width="900"
											data-file-height="600"
										/>
										Hong Kong (HK)
									</div>
								</button>
							</li>

							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									on:click={() => addCountryCode('JP')}
								>
									<div class="inline-flex items-center">
										<img
											alt="일본의 기"
											src="//upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/22px-Flag_of_Japan.svg.png"
											decoding="async"
											width="22"
											height="15"
											class="h-4.5 w-4.5 me-2"
											srcset="//upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/33px-Flag_of_Japan.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/44px-Flag_of_Japan.svg.png 2x"
											data-file-width="900"
											data-file-height="600"
										/>
										Japan (JP)
									</div>
								</button>
							</li>

							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									on:click={() => addCountryCode('ES')}
								>
									<div class="inline-flex items-center">
										<img
											alt="스페인의 기"
											src="//upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/22px-Flag_of_Spain.svg.png"
											decoding="async"
											width="22"
											height="15"
											class="h-4.5 w-4.5 me-2"
											srcset="//upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/33px-Flag_of_Spain.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/44px-Flag_of_Spain.svg.png 2x"
											data-file-width="750"
											data-file-height="500"
										/>
										Spain (ES)
									</div>
								</button>
							</li>

							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									on:click={() => addCountryCode('CN')}
								>
									<div class="inline-flex items-center">
										<img
											alt="중국의 기"
											src="//upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/22px-Flag_of_the_People%27s_Republic_of_China.svg.png"
											decoding="async"
											width="22"
											height="15"
											class="h-4.5 w-4.5 me-2"
											srcset="//upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/33px-Flag_of_the_People%27s_Republic_of_China.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/44px-Flag_of_the_People%27s_Republic_of_China.svg.png 2x"
											data-file-width="900"
											data-file-height="600"
										/>
										China (CN)
									</div>
								</button>
							</li>
							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									on:click={() => addCountryCode('US')}
								>
									<div class="inline-flex items-center">
										<img
											alt="미국의 기"
											src="//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/22px-Flag_of_the_United_States.svg.png"
											decoding="async"
											width="22"
											height="12"
											class="mw-file-element"
											srcset="//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/33px-Flag_of_the_United_States.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/44px-Flag_of_the_United_States.svg.png 2x"
											data-file-width="1235"
											data-file-height="650"
										/>
										United States (US)
									</div>
								</button>
							</li>
						</ul>
					</div>
					<div class="relative w-full">
						<input
							type="text"
							id="countryCodes"
							name="countryCodes"
							bind:value={countryCodes}
							class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
							placeholder="List of country candidates"
						/>
					</div>
				</div>
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
