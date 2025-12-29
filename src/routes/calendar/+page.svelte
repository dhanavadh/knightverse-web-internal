<script lang="ts">
	import CalendarMonth from '$lib/components/calendar/CalendarMonth.svelte';
	import EventList from '$lib/components/calendar/EventList.svelte';
	import EventModal from '$lib/components/calendar/EventModal.svelte';

	let { data } = $props();

	interface SerializedEvent {
		id: string;
		title: string;
		description?: string;
		location?: string;
		start: string;
		end: string;
		allDay: boolean;
		source: string;
		color?: string;
	}

	let selectedEvent = $state<SerializedEvent | null>(null);

	function handleEventClick(event: SerializedEvent) {
		selectedEvent = event;
	}

	function closeModal() {
		selectedEvent = null;
	}
</script>

<svelte:head>
	<title>ปฏิทิน | KnightVerse</title>
	<meta name="description" content="ดูกิจกรรมและตารางเวลาของ KnightVerse" />
</svelte:head>

<div class="font-sans flex flex-col w-full">
	<div class="flex flex-col max-w-7xl mx-auto p-6 items-start w-full min-h-screen">
		<h1 class="text-4xl font-semibold mb-8">ปฏิทินกิจกรรม</h1>

		{#if data.sources.length === 0}
			<div class="w-full p-8 bg-stone-50 rounded-xl text-center">
				<p class="text-stone-600 mb-2">ยังไม่ได้ตั้งค่าแหล่งปฏิทิน</p>
				<p class="text-sm text-stone-500">
					เพิ่ม ICS URLs ใน <code class="bg-stone-200 px-1 rounded">src/lib/config/calendar.config.ts</code>
				</p>
			</div>
		{:else}
			<div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Calendar View -->
				<div class="lg:col-span-2">
					<CalendarMonth events={data.events} onEventClick={handleEventClick} />
				</div>

				<!-- Upcoming Events -->
				<div class="lg:col-span-1">
					<EventList events={data.events} onEventClick={handleEventClick} />

					<!-- Calendar Sources Legend -->
					{#if data.sources.length > 0}
						<div class="mt-8">
							<h3 class="text-lg font-semibold mb-3">แหล่งปฏิทิน</h3>
							<div class="flex flex-wrap gap-2">
								{#each data.sources as source}
									<div
										class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
										style="background-color: {source.color || '#6366f1'}20; color: {source.color ||
											'#6366f1'};"
									>
										<span
											class="w-2 h-2 rounded-full"
											style="background-color: {source.color || '#6366f1'};"
										></span>
										{source.name}
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- Event Detail Modal -->
<EventModal event={selectedEvent} onclose={closeModal} />
