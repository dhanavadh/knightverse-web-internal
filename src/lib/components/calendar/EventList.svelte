<script lang="ts">
	import { MapPin, Clock } from '@lucide/svelte';

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

	interface Props {
		events: SerializedEvent[];
		limit?: number;
		onEventClick?: (event: SerializedEvent) => void;
	}

	let { events, limit = 10, onEventClick }: Props = $props();

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	let upcomingEvents = $derived(
		events
			.filter((e) => new Date(e.start) >= today)
			.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
			.slice(0, limit)
	);

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('th-TH', {
			weekday: 'short',
			day: 'numeric',
			month: 'short'
		});
	}

	function formatTime(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
	}

	function formatTimeRange(start: string, end: string, allDay: boolean) {
		if (allDay) return 'ทั้งวัน';
		return `${formatTime(start)} - ${formatTime(end)}`;
	}
</script>

<div class="w-full">
	<h3 class="text-lg font-semibold mb-4">กิจกรรมที่กำลังจะมาถึง</h3>

	{#if upcomingEvents.length === 0}
		<p class="text-stone-500 text-sm">ไม่มีกิจกรรมที่กำลังจะมาถึง</p>
	{:else}
		<div class="flex flex-col gap-3">
			{#each upcomingEvents as event}
				<button
					type="button"
					class="p-4 rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all text-left cursor-pointer"
					style="border-left: 3px solid {event.color || '#6366f1'};"
					onclick={() => onEventClick?.(event)}
				>
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1 min-w-0">
							<h4 class="font-medium text-stone-900 truncate">{event.title}</h4>

							<div class="flex flex-wrap items-center gap-3 mt-2 text-sm text-stone-600">
								<span class="inline-flex items-center gap-1">
									<Clock class="w-4 h-4" />
									{formatDate(event.start)} {formatTimeRange(event.start, event.end, event.allDay)}
								</span>

								{#if event.location}
									<span class="inline-flex items-center gap-1">
										<MapPin class="w-4 h-4" />
										{event.location}
									</span>
								{/if}
							</div>

							{#if event.description}
								<p class="mt-2 text-sm text-stone-500 line-clamp-2">{event.description}</p>
							{/if}
						</div>

						<div
							class="text-xs px-2 py-1 rounded-full shrink-0"
							style="background-color: {event.color || '#6366f1'}20; color: {event.color ||
								'#6366f1'};"
						>
							{event.source}
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>
