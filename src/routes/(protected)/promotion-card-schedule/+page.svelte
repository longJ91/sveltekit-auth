<script lang="ts">

	export let data: any;

	let pages: Array<number> = [];

	for (let i = 0; i < data.promotionCardScheduleInfoResponse.totalPage; i++) {
		pages.push(i + 1);
	}

	const windowSize = data.promotionCardScheduleInfoResponse.windowSize;

	$: previousPage =
		data.promotionCardScheduleInfoResponse.currentPage < 2
			? 1
			: data.promotionCardScheduleInfoResponse.currentPage - 1;
	$: nextPage =
		data.promotionCardScheduleInfoResponse.currentPage >=
		data.promotionCardScheduleInfoResponse.totalPage
			? data.promotionCardScheduleInfoResponse.totalPage
			: data.promotionCardScheduleInfoResponse.currentPage + 1;
	$: showingFirstIndex = 1 + (data.promotionCardScheduleInfoResponse.currentPage - 1) * windowSize;
	$: showingLastIndex =
		data.promotionCardScheduleInfoResponse.currentPage ==
		data.promotionCardScheduleInfoResponse.totalPage
			? data.promotionCardScheduleInfoResponse.totalCount
			: data.promotionCardScheduleInfoResponse.currentPage * windowSize;
</script>

<div>
	{#await data}
		<p>...Loading</p>
	{:then data}
		{#each data.promotionCardScheduleInfoResponse.promotionCardSchedules as promotionCardSchedule, idx}
			{JSON.stringify(promotionCardSchedule)}
			{console.log(promotionCardSchedule)}
		{/each}
	{:catch error}
		<p>오류가 발생했습니다.</p>
	{/await}
</div>
