<script lang="ts">
	import { X, Clock, MapPin, Calendar, FileText, Tag } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';

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
		event: SerializedEvent | null;
		onclose: () => void;
	}

	let { event, onclose }: Props = $props();

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('th-TH', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function formatTime(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
	}

	function formatDateRange(start: string, end: string, allDay: boolean) {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const sameDay = startDate.toDateString() === endDate.toDateString();

		if (allDay) {
			if (sameDay) {
				return formatDate(start);
			}
			return `${formatDate(start)} - ${formatDate(end)}`;
		}

		if (sameDay) {
			return `${formatDate(start)}, ${formatTime(start)} - ${formatTime(end)}`;
		}

		return `${formatDate(start)} ${formatTime(start)} - ${formatDate(end)} ${formatTime(end)}`;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onclose();
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onclose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if event}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
		transition:fade={{ duration: 150 }}
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="event-title"
		tabindex="-1"
	>
		<!-- Modal -->
		<div
			class="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden"
			transition:fly={{ y: 20, duration: 200 }}
		>
			<!-- Header -->
			<div class="p-6 border-b border-stone-100" style="border-top: 4px solid {event.color || '#6366f1'};">
				<div class="flex items-start justify-between gap-4">
					<h2 id="event-title" class="text-xl font-semibold text-stone-900 pr-8">
						{event.title}
					</h2>
					<button
						onclick={onclose}
						class="p-2 -m-2 hover:bg-stone-100 rounded-lg transition-colors"
						aria-label="ปิด"
					>
						<X class="w-5 h-5 text-stone-500" />
					</button>
				</div>
			</div>

			<!-- Content -->
			<div class="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
				<!-- Date & Time -->
				<div class="flex items-start gap-3">
					<Calendar class="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
					<div>
						<p class="text-sm text-stone-500">วันที่และเวลา</p>
						<p class="text-stone-900">
							{formatDateRange(event.start, event.end, event.allDay)}
						</p>
						{#if event.allDay}
							<span class="inline-block mt-1 text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full">
								ทั้งวัน
							</span>
						{/if}
					</div>
				</div>

				<!-- Location -->
				{#if event.location}
					<div class="flex items-start gap-3">
						<MapPin class="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
						<div>
							<p class="text-sm text-stone-500">สถานที่</p>
							<p class="text-stone-900">{event.location}</p>
						</div>
					</div>
				{/if}

				<!-- Description -->
				{#if event.description}
					<div class="flex items-start gap-3">
						<FileText class="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
						<div class="flex-1 min-w-0">
							<p class="text-sm text-stone-500">รายละเอียด</p>
							<p class="text-stone-900 whitespace-pre-wrap break-words">{event.description}</p>
						</div>
					</div>
				{/if}

				<!-- Source -->
				<div class="flex items-start gap-3">
					<Tag class="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
					<div>
						<p class="text-sm text-stone-500">แหล่งปฏิทิน</p>
						<span
							class="inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm mt-1"
							style="background-color: {event.color || '#6366f1'}20; color: {event.color || '#6366f1'};"
						>
							<span
								class="w-2 h-2 rounded-full"
								style="background-color: {event.color || '#6366f1'};"
							></span>
							{event.source}
						</span>
					</div>
				</div>
			</div>

			<!-- Footer -->
			<div class="p-4 border-t border-stone-100 bg-stone-50">
				<button
					onclick={onclose}
					class="w-full px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
				>
					ปิด
				</button>
			</div>
		</div>
	</div>
{/if}
