<script lang="ts">
	import type { Country, BannerExposure, Area } from '$lib/model/response-type';
	import { invalidateAll, goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';

	export let data;

	const countries: Array<Country> = data.countries;
	const emptyBannerExposures: Array<BannerExposure> = [];
	const emptyAreas: Array<Array<Area>> = [];
	const emptyString: Array<String> = [];
	const emptyArea: Area = {
		code: 'empty',
		name: 'empty',
		parentCode: 'empty'
	};

	const fetchData = async (depth: number, idx: number, paraentCode: string) => {
		// try {
		// 	//apiURL client-side 에서 사용 가능하게 변경하기
		// 	const res: Response = await fetch(
		// 		'http://127.0.0.1:8080' + '/v1/areas?parentCode=' + paraentCode,
		// 		{
		// 			method: 'GET',
		// 			mode: 'cors',
		// 			headers: {
		// 				'Device-Model': 'iPhone',
		// 				'OS-Type': 'ios',
		// 				'OS-Version': '1.0.0',
		// 				'App-Version': '1.0.0',
		// 				'Country-Code': 'KR',
		// 				'Accept-Language': 'ko',
		// 				'Content-Type': 'application/json',
		// 				'Access-Control-Allow-Origin': '*'
		// 				// 'Session': ''
		// 			}
		// 		}
		// 	);
		// 	const result: Array<Area> = await res.json();
		// 	depth3Objs = depth3Objs.with(idx, result);
		// } catch (error) {
		// 	console.error('Error fetching data:', error);
		// }
		const depth3Dumy: Array<Area> = [
			{
				code: '100',
				name: 'Alabama',
				parentCode: 'US'
			},
			{
				code: '110',
				name: 'Alaska',
				parentCode: 'US'
			},
			{
				code: '120',
				name: 'Arizona',
				parentCode: 'US'
			},
			{
				code: '130',
				name: 'Arkansas',
				parentCode: 'US'
			},
			{
				code: '140',
				name: 'California',
				parentCode: 'US'
			},
			{
				code: '150',
				name: 'Colorado',
				parentCode: 'US'
			},
			{
				code: '160',
				name: 'Connecticut',
				parentCode: 'US'
			},
			{
				code: '170',
				name: 'Delaware',
				parentCode: 'US'
			},
			{
				code: '180',
				name: 'Florida',
				parentCode: 'US'
			},
			{
				code: '190',
				name: 'Georgia',
				parentCode: 'US'
			},
			{
				code: '200',
				name: 'Hawaii',
				parentCode: 'US'
			},
			{
				code: '210',
				name: 'Idaho',
				parentCode: 'US'
			},
			{
				code: '220',
				name: 'Illinois',
				parentCode: 'US'
			},
			{
				code: '230',
				name: 'Indiana',
				parentCode: 'US'
			},
			{
				code: '240',
				name: 'Iowa',
				parentCode: 'US'
			},
			{
				code: '250',
				name: 'Kansas',
				parentCode: 'US'
			},
			{
				code: '260',
				name: 'Kentucky',
				parentCode: 'US'
			},
			{
				code: '270',
				name: 'Louisiana',
				parentCode: 'US'
			},
			{
				code: '280',
				name: 'Maine',
				parentCode: 'US'
			},
			{
				code: '290',
				name: 'Maryland',
				parentCode: 'US'
			},
			{
				code: '300',
				name: 'Massachusetts',
				parentCode: 'US'
			},
			{
				code: '310',
				name: 'Michigan',
				parentCode: 'US'
			},
			{
				code: '320',
				name: 'Minnesota',
				parentCode: 'US'
			},
			{
				code: '330',
				name: 'Mississippi',
				parentCode: 'US'
			},
			{
				code: '340',
				name: 'Missouri',
				parentCode: 'US'
			},
			{
				code: '350',
				name: 'Montana',
				parentCode: 'US'
			},
			{
				code: '360',
				name: 'Nebraska',
				parentCode: 'US'
			},
			{
				code: '370',
				name: 'Nevada',
				parentCode: 'US'
			},
			{
				code: '380',
				name: 'New Hampshire',
				parentCode: 'US'
			},
			{
				code: '390',
				name: 'New Jersey',
				parentCode: 'US'
			},
			{
				code: '400',
				name: 'New Mexico',
				parentCode: 'US'
			},
			{
				code: '410',
				name: 'New York',
				parentCode: 'US'
			},
			{
				code: '420',
				name: 'North Carolina',
				parentCode: 'US'
			},
			{
				code: '430',
				name: 'North Dakota',
				parentCode: 'US'
			},
			{
				code: '440',
				name: 'Ohio',
				parentCode: 'US'
			},
			{
				code: '450',
				name: 'Oklahoma',
				parentCode: 'US'
			},
			{
				code: '460',
				name: 'Oregon',
				parentCode: 'US'
			},
			{
				code: '470',
				name: 'Pennsylvania',
				parentCode: 'US'
			},
			{
				code: '480',
				name: 'Rhode Island',
				parentCode: 'US'
			},
			{
				code: '490',
				name: 'South Carolina',
				parentCode: 'US'
			},
			{
				code: '500',
				name: 'South Dakota',
				parentCode: 'US'
			},
			{
				code: '510',
				name: 'Tennessee',
				parentCode: 'US'
			},
			{
				code: '520',
				name: 'Texas',
				parentCode: 'US'
			},
			{
				code: '530',
				name: 'Utah',
				parentCode: 'US'
			},
			{
				code: '540',
				name: 'Vermont',
				parentCode: 'US'
			},
			{
				code: '550',
				name: 'Virginia',
				parentCode: 'US'
			},
			{
				code: '560',
				name: 'Washington',
				parentCode: 'US'
			},
			{
				code: '570',
				name: 'West Virginia',
				parentCode: 'US'
			},
			{
				code: '580',
				name: 'Wisconsin',
				parentCode: 'US'
			},
			{
				code: '590',
				name: 'Wyoming',
				parentCode: 'US'
			}
		];
		const depth4Dumy: Array<Area> = [
			{
				code: '340001',
				name: 'Adair',
				parentCode: '340'
			},
			{
				code: '340002',
				name: 'Andrew',
				parentCode: '340'
			},
			{
				code: '340003',
				name: 'Atchison',
				parentCode: '340'
			},
			{
				code: '340004',
				name: 'Audrain',
				parentCode: '340'
			},
			{
				code: '340005',
				name: 'Barry',
				parentCode: '340'
			},
			{
				code: '340006',
				name: 'Barton',
				parentCode: '340'
			},
			{
				code: '340007',
				name: 'Bates',
				parentCode: '340'
			},
			{
				code: '340008',
				name: 'Benton',
				parentCode: '340'
			},
			{
				code: '340009',
				name: 'Bollinger',
				parentCode: '340'
			},
			{
				code: '340010',
				name: 'Boone',
				parentCode: '340'
			},
			{
				code: '340011',
				name: 'Buchanan',
				parentCode: '340'
			},
			{
				code: '340012',
				name: 'Butler',
				parentCode: '340'
			},
			{
				code: '340013',
				name: 'Caldwell',
				parentCode: '340'
			},
			{
				code: '340014',
				name: 'Callaway',
				parentCode: '340'
			},
			{
				code: '340015',
				name: 'Camden',
				parentCode: '340'
			},
			{
				code: '340016',
				name: 'Cape Girardeau',
				parentCode: '340'
			},
			{
				code: '340017',
				name: 'Carroll',
				parentCode: '340'
			},
			{
				code: '340018',
				name: 'Carter',
				parentCode: '340'
			},
			{
				code: '340019',
				name: 'Cass',
				parentCode: '340'
			},
			{
				code: '340020',
				name: 'Cedar',
				parentCode: '340'
			},
			{
				code: '340021',
				name: 'Chariton',
				parentCode: '340'
			},
			{
				code: '340022',
				name: 'Christian',
				parentCode: '340'
			},
			{
				code: '340023',
				name: 'Clark',
				parentCode: '340'
			},
			{
				code: '340024',
				name: 'Clay',
				parentCode: '340'
			},
			{
				code: '340025',
				name: 'Clinton',
				parentCode: '340'
			},
			{
				code: '340026',
				name: 'Cole',
				parentCode: '340'
			},
			{
				code: '340027',
				name: 'Cooper',
				parentCode: '340'
			},
			{
				code: '340028',
				name: 'Crawford',
				parentCode: '340'
			},
			{
				code: '340029',
				name: 'Dade',
				parentCode: '340'
			},
			{
				code: '340030',
				name: 'Dallas',
				parentCode: '340'
			},
			{
				code: '340031',
				name: 'Daviess',
				parentCode: '340'
			},
			{
				code: '340032',
				name: 'DeKalb',
				parentCode: '340'
			},
			{
				code: '340033',
				name: 'Dent',
				parentCode: '340'
			},
			{
				code: '340034',
				name: 'Douglas',
				parentCode: '340'
			},
			{
				code: '340035',
				name: 'Dunklin',
				parentCode: '340'
			},
			{
				code: '340036',
				name: 'Franklin',
				parentCode: '340'
			},
			{
				code: '340037',
				name: 'Gasconade',
				parentCode: '340'
			},
			{
				code: '340038',
				name: 'Gentry',
				parentCode: '340'
			},
			{
				code: '340039',
				name: 'Greene',
				parentCode: '340'
			},
			{
				code: '340040',
				name: 'Grundy',
				parentCode: '340'
			},
			{
				code: '340041',
				name: 'Harrison',
				parentCode: '340'
			},
			{
				code: '340042',
				name: 'Henry',
				parentCode: '340'
			},
			{
				code: '340043',
				name: 'Hickory',
				parentCode: '340'
			},
			{
				code: '340044',
				name: 'Holt',
				parentCode: '340'
			},
			{
				code: '340045',
				name: 'Howard',
				parentCode: '340'
			},
			{
				code: '340046',
				name: 'Howell',
				parentCode: '340'
			},
			{
				code: '340047',
				name: 'Iron',
				parentCode: '340'
			},
			{
				code: '340048',
				name: 'Jackson',
				parentCode: '340'
			},
			{
				code: '340049',
				name: 'Jasper',
				parentCode: '340'
			},
			{
				code: '340050',
				name: 'Jefferson',
				parentCode: '340'
			},
			{
				code: '340051',
				name: 'Johnson',
				parentCode: '340'
			},
			{
				code: '340052',
				name: 'Knox',
				parentCode: '340'
			},
			{
				code: '340053',
				name: 'Laclede',
				parentCode: '340'
			},
			{
				code: '340054',
				name: 'Lafayette',
				parentCode: '340'
			},
			{
				code: '340055',
				name: 'Lawrence',
				parentCode: '340'
			},
			{
				code: '340056',
				name: 'Lewis',
				parentCode: '340'
			},
			{
				code: '340057',
				name: 'Lincoln',
				parentCode: '340'
			},
			{
				code: '340058',
				name: 'Linn',
				parentCode: '340'
			},
			{
				code: '340059',
				name: 'Livingston',
				parentCode: '340'
			},
			{
				code: '340060',
				name: 'McDonald',
				parentCode: '340'
			},
			{
				code: '340061',
				name: 'Macon',
				parentCode: '340'
			},
			{
				code: '340062',
				name: 'Madison',
				parentCode: '340'
			},
			{
				code: '340063',
				name: 'Maries',
				parentCode: '340'
			},
			{
				code: '340064',
				name: 'Marion',
				parentCode: '340'
			},
			{
				code: '340065',
				name: 'Mercer',
				parentCode: '340'
			},
			{
				code: '340066',
				name: 'Miller',
				parentCode: '340'
			},
			{
				code: '340067',
				name: 'Mississippi',
				parentCode: '340'
			},
			{
				code: '340068',
				name: 'Moniteau',
				parentCode: '340'
			},
			{
				code: '340069',
				name: 'Monroe',
				parentCode: '340'
			},
			{
				code: '340070',
				name: 'Montgomery',
				parentCode: '340'
			},
			{
				code: '340071',
				name: 'Morgan',
				parentCode: '340'
			},
			{
				code: '340072',
				name: 'New Madrid',
				parentCode: '340'
			},
			{
				code: '340073',
				name: 'Newton',
				parentCode: '340'
			},
			{
				code: '340074',
				name: 'Nodaway',
				parentCode: '340'
			},
			{
				code: '340075',
				name: 'Oregon',
				parentCode: '340'
			},
			{
				code: '340076',
				name: 'Osage',
				parentCode: '340'
			},
			{
				code: '340077',
				name: 'Ozark',
				parentCode: '340'
			},
			{
				code: '340078',
				name: 'Pemiscot',
				parentCode: '340'
			},
			{
				code: '340079',
				name: 'Perry',
				parentCode: '340'
			},
			{
				code: '340080',
				name: 'Pettis',
				parentCode: '340'
			},
			{
				code: '340081',
				name: 'Phelps',
				parentCode: '340'
			},
			{
				code: '340082',
				name: 'Pike',
				parentCode: '340'
			},
			{
				code: '340083',
				name: 'Platte',
				parentCode: '340'
			},
			{
				code: '340084',
				name: 'Polk',
				parentCode: '340'
			},
			{
				code: '340085',
				name: 'Pulaski',
				parentCode: '340'
			},
			{
				code: '340086',
				name: 'Putnam',
				parentCode: '340'
			},
			{
				code: '340087',
				name: 'Ralls',
				parentCode: '340'
			},
			{
				code: '340088',
				name: 'Randolph',
				parentCode: '340'
			},
			{
				code: '340089',
				name: 'Ray',
				parentCode: '340'
			},
			{
				code: '340090',
				name: 'Reynolds',
				parentCode: '340'
			},
			{
				code: '340091',
				name: 'Ripley',
				parentCode: '340'
			},
			{
				code: '340092',
				name: 'St. Charles',
				parentCode: '340'
			},
			{
				code: '340093',
				name: 'St. Clair',
				parentCode: '340'
			},
			{
				code: '340094',
				name: 'Ste. Genevieve',
				parentCode: '340'
			},
			{
				code: '340095',
				name: 'St. Francois',
				parentCode: '340'
			},
			{
				code: '340096',
				name: 'St. Louis',
				parentCode: '340'
			},
			{
				code: '340097',
				name: 'Saline',
				parentCode: '340'
			},
			{
				code: '340098',
				name: 'Schuyler',
				parentCode: '340'
			},
			{
				code: '340099',
				name: 'Scotland',
				parentCode: '340'
			},
			{
				code: '340100',
				name: 'Scott',
				parentCode: '340'
			},
			{
				code: '340101',
				name: 'Shannon',
				parentCode: '340'
			},
			{
				code: '340102',
				name: 'Shelby',
				parentCode: '340'
			},
			{
				code: '340103',
				name: 'Stoddard',
				parentCode: '340'
			},
			{
				code: '340104',
				name: 'Stone',
				parentCode: '340'
			},
			{
				code: '340105',
				name: 'Sullivan',
				parentCode: '340'
			},
			{
				code: '340106',
				name: 'Taney',
				parentCode: '340'
			},
			{
				code: '340107',
				name: 'Texas',
				parentCode: '340'
			},
			{
				code: '340108',
				name: 'Vernon',
				parentCode: '340'
			},
			{
				code: '340109',
				name: 'Warren',
				parentCode: '340'
			},
			{
				code: '340110',
				name: 'Washington',
				parentCode: '340'
			},
			{
				code: '340111',
				name: 'Wayne',
				parentCode: '340'
			},
			{
				code: '340112',
				name: 'Webster',
				parentCode: '340'
			},
			{
				code: '340113',
				name: 'Worth',
				parentCode: '340'
			},
			{
				code: '340114',
				name: 'Wright',
				parentCode: '340'
			},
			{
				code: '340115',
				name: 'St. Louis city',
				parentCode: '340'
			}
		];
		if (depth == 3) {
			depth3Objs = depth3Objs.with(idx, depth3Dumy);
		} else {
			depth4Objs = depth4Objs.with(idx, depth4Dumy);
		}
	};

	$: status = true;
	$: thumbnailUrl = '';
	$: depth2Objs = emptyBannerExposures;
	$: depth3Objs = emptyAreas;
	$: depth4Objs = emptyAreas;
	$: userClassObjs = emptyString;
	$: exposureCount = 0;

	function handleToggle() {
		status = !status;
		invalidateAll();
	}

	function addExposure() {
		depth2Objs = depth2Objs.concat({
			areaDepth: 2
		});
		depth3Objs = depth3Objs.concat([emptyArea]);
		depth4Objs = depth4Objs.concat([emptyArea]);
		userClassObjs = userClassObjs.concat('A,B,C,NONE');
		exposureCount++;
	}

	function clickCountryButton(idx: number, countryCode: string) {
		depth2Objs[idx].areaCode = countryCode;
		fetchData(3, idx, countryCode);
	}

	function clickDepth3Button(idx: number, parentCode: string) {
		fetchData(4, idx, parentCode);
	}

	function removeExposure(targetIdx: number) {
		depth2Objs = depth2Objs.filter((value, idx) => idx != targetIdx);
		depth3Objs = depth3Objs.filter((value, idx) => idx != targetIdx);
		depth4Objs = depth4Objs.filter((value, idx) => idx != targetIdx);
		userClassObjs = userClassObjs.filter((value, idx) => idx != targetIdx);
		exposureCount--;
	}

	function handleCancel() {
		goto('/banner', { replaceState: true });
	}

	async function temp() {
		const res: Response = await fetch('/api/generate/upload-signed-urls', {
			method: 'GET'
		});
		console.log(await res.json());
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
				<Button on:click={temp}>추가</Button>
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

			<div class="mb-6">
				<Label for="exposure" class="block mb-4">Exposure</Label>
				<Button on:click={addExposure}>추가</Button>
			</div>

			{#each depth2Objs as depth2Obj, idx}
				<div class="mb-4">
					<div class="flex gap-4">
						<Select.Root portal={null} preventScroll={false}>
							<Select.Trigger class="w-[260px]">
								<Select.Value placeholder="Country" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each countries as country}
										<Select.Item
											value={country.code}
											label={country.name}
											on:click={() => clickCountryButton(idx, country.code)}
											>{country.name}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name={idx + '-depth2'} />
						</Select.Root>

						<Select.Root portal={null} preventScroll={false}>
							<Select.Trigger class="w-[300px]">
								<Select.Value placeholder="Select a Depth 3 Area Code" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each depth3Objs[idx] as depth3Obj}
										<Select.Item
											value={depth3Obj.code}
											label={depth3Obj.name}
											on:click={() => clickDepth3Button(idx, depth3Obj.code)}
											>{depth3Obj.name}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name={idx + '-depth3'} />
						</Select.Root>

						<Select.Root portal={null} preventScroll={false}>
							<Select.Trigger class="w-[300px]">
								<Select.Value placeholder="Select a Depth 4 Area Code" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each depth4Objs[idx] as depth4Obj}
										<Select.Item
											value={depth4Obj.code}
											label={depth4Obj.name}
											on:click={() => clickCountryButton(idx, depth4Obj.code)}
											>{depth4Obj.name}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name={idx + '-depth4'} />
						</Select.Root>

						<Input class="w-[300px]" name={idx + '-user-class'} bind:value={userClassObjs[idx]} />

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
