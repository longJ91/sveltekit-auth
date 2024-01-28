<script lang="ts">
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import {
		addSortBy,
		addPagination,
		addTableFilter,
		addSelectedRows,
		addHiddenColumns
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import Actions from './data-table-actions.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import type { PromotionCardSchedule } from './[slug]/+page.server';
	import { goto } from '$app/navigation';

	import { mediaQuery } from 'svelte-legos';

	const isDesktop = mediaQuery('(min-width: 768px)');

	export let data: any;

	const initPageSize = 1;

	const promotionCardSchedules: PromotionCardSchedule[] =
		data.promotionCardScheduleInfoResponse.promotionCardSchedules;

	$: count = data.promotionCardScheduleInfoResponse.totalCount;
	// $: perPage = data.promotionCardScheduleInfoResponse.windowSize;
	$: perPage = initPageSize;
	$: page = 1;
	$: siblingCount = $isDesktop ? 1 : 0;

	const table = createTable(readable(promotionCardSchedules), {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination({ initialPageIndex: 0, initialPageSize: initPageSize }),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			header: 'ID',
			accessor: 'id',
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Title',
			accessor: 'title',
			// cell: ({ value }) => value.toLowerCase(),
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Type',
			accessor: 'type',
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Category',
			accessor: 'category',
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Start Date',
			accessor: 'startDate',
			cell: ({ value }) => new Date(value).toLocaleString(),
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: false
				}
			}
		}),
		table.column({
			header: 'End Date',
			accessor: 'endDate',
			cell: ({ value }) => new Date(value).toLocaleString(),
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: false
				}
			}
		}),
		table.column({
			header: 'Display',
			accessor: 'isDisplay',
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: '',
			accessor: ({ id }) => id,
			cell: (item) => {
				return createRender(Actions, {
					id: item.value.toString(),
					name: 'promotion-card-schedule'
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } =
		table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex, pageSize } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds } = pluginStates.select;

	const hideableCols = ['id', 'title', 'type', 'category', 'startDate', 'endDate', 'isDisplay'];
</script>

<div class="w-9/12 container flex items-center space-x-4 sm:justify-between">
	<div class="container">
		<div class="flex justify-center text-6xl">
			<p>Promotion Card</p>
		</div>
		<div class="flex items-center py-4">
			<Button
				class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				variant="secondary"
				on:click={() =>
					goto('/promotion-card-schedule/create', {
						invalidateAll: true
					})}>Create</Button
			>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" class="ml-auto" builders={[builder]}>
						Columns <ChevronDown class="ml-2 h-4 w-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each flatColumns as col}
						{#if hideableCols.includes(col.id)}
							<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
								{col.header}
							</DropdownMenu.CheckboxItem>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class="rounded-md border">
			<Table.Root {...$tableAttrs}>
				<Table.Header>
					{#each $headerRows as headerRow}
						<Subscribe rowAttrs={headerRow.attrs()}>
							<Table.Row>
								{#each headerRow.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
										<Table.Head {...attrs} class={cn('[&:has([role=checkbox])]:pl-3')}>
											{#if cell.id === '#'}
												<div class="text-right font-medium">
													<Render of={cell.render()} />
												</div>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</Table.Head>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Header>
				<Table.Body {...$tableBodyAttrs}>
					{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
											{#if cell.id === 'amount'}
												<div class="text-right font-medium">
													<Render of={cell.render()} />
												</div>
											{:else if cell.id === 'status'}
												<div class="capitalize">
													<Render of={cell.render()} />
												</div>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
		<div class="flex space-x-2 py-4">
			<div class="flex flex-row items-center space-x-4">
				<p>Show</p>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="outline" class="ml-auto" builders={[builder]}>
							{$pageSize}
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.RadioGroup bind:value={$pageSize}>
							<DropdownMenu.RadioItem value="1" on:click={() => ($pageIndex = 0)}
								>1</DropdownMenu.RadioItem
							>
							<DropdownMenu.RadioItem value="2" on:click={() => ($pageIndex = 0)}
								>2</DropdownMenu.RadioItem
							>
							<DropdownMenu.RadioItem value="5" on:click={() => ($pageIndex = 0)}
								>5</DropdownMenu.RadioItem
							>
							<DropdownMenu.RadioItem value="10" on:click={() => ($pageIndex = 0)}
								>10</DropdownMenu.RadioItem
							>
							<DropdownMenu.RadioItem value="20" on:click={() => ($pageIndex = 0)}
								>20</DropdownMenu.RadioItem
							>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<p>rows</p>
			</div>
			<Pagination.Root
				class="items-end"
				{count}
				bind:perPage={$pageSize}
				{siblingCount}
				{page}
				let:pages
				let:currentPage
			>
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton on:click={() => ($pageIndex = $pageIndex - 1)}>
							<ChevronLeft class="h-4 w-4" />
							<span class="hidden sm:block">Previous</span>
						</Pagination.PrevButton>
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link
									{page}
									isActive={currentPage == page.value}
									on:click={() => ($pageIndex = page.value - 1)}
								>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton on:click={() => ($pageIndex = $pageIndex + 1)}>
							<span class="hidden sm:block">Next</span>
							<ChevronRight class="h-4 w-4" />
						</Pagination.NextButton>
					</Pagination.Item>
				</Pagination.Content>
			</Pagination.Root>
		</div>
	</div>
</div>
