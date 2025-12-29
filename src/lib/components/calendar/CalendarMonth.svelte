<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

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
		initialYear?: number;
		initialMonth?: number;
		onEventClick?: (event: SerializedEvent) => void;
	}

	let { events, initialYear, initialMonth, onEventClick }: Props = $props();

	const today = new Date();
	let currentYear = $state(initialYear ?? today.getFullYear());
	let currentMonth = $state(initialMonth ?? today.getMonth());

	const weekDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
	const monthNames = [
		'มกราคม',
		'กุมภาพันธ์',
		'มีนาคม',
		'เมษายน',
		'พฤษภาคม',
		'มิถุนายน',
		'กรกฎาคม',
		'สิงหาคม',
		'กันยายน',
		'ตุลาคม',
		'พฤศจิกายน',
		'ธันวาคม'
	];

	function getCalendarDays(year: number, month: number) {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startDayOfWeek = firstDay.getDay();

		const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

		// Previous month days
		const prevMonthLastDay = new Date(year, month, 0).getDate();
		for (let i = startDayOfWeek - 1; i >= 0; i--) {
			days.push({
				date: new Date(year, month - 1, prevMonthLastDay - i),
				isCurrentMonth: false
			});
		}

		// Current month days
		for (let i = 1; i <= daysInMonth; i++) {
			days.push({
				date: new Date(year, month, i),
				isCurrentMonth: true
			});
		}

		// Next month days
		const remainingDays = 42 - days.length;
		for (let i = 1; i <= remainingDays; i++) {
			days.push({
				date: new Date(year, month + 1, i),
				isCurrentMonth: false
			});
		}

		return days;
	}

	function getEventsForDay(date: Date) {
		const dayStart = new Date(date);
		dayStart.setHours(0, 0, 0, 0);
		const dayEnd = new Date(date);
		dayEnd.setHours(23, 59, 59, 999);

		return events.filter((event) => {
			const eventStart = new Date(event.start).getTime();
			const eventEnd = new Date(event.end).getTime();
			return eventStart <= dayEnd.getTime() && eventEnd >= dayStart.getTime();
		});
	}

	function isToday(date: Date) {
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	}

	function prevMonth() {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
	}

	function nextMonth() {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
	}

	function goToToday() {
		currentYear = today.getFullYear();
		currentMonth = today.getMonth();
	}

	let calendarDays = $derived(getCalendarDays(currentYear, currentMonth));

	function formatTime(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
	}
</script>

<div class="w-full">
	<!-- Header -->
	<div class="flex items-center justify-between mb-6">
		<div class="flex items-center gap-4">
			<h2 class="text-2xl font-semibold">
				{monthNames[currentMonth]}
				{currentYear + 543}
			</h2>
			<button
				onclick={goToToday}
				class="px-3 py-1 text-sm border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
			>
				วันนี้
			</button>
		</div>
		<div class="flex items-center gap-2">
			<button
				onclick={prevMonth}
				class="p-2 hover:bg-stone-100 rounded-lg transition-colors"
				aria-label="Previous month"
			>
				<ChevronLeft class="w-5 h-5" />
			</button>
			<button
				onclick={nextMonth}
				class="p-2 hover:bg-stone-100 rounded-lg transition-colors"
				aria-label="Next month"
			>
				<ChevronRight class="w-5 h-5" />
			</button>
		</div>
	</div>

	<!-- Calendar Grid -->
	<div class="border border-stone-200 rounded-xl overflow-hidden">
		<!-- Week days header -->
		<div class="grid grid-cols-7 bg-stone-50 border-b border-stone-200">
			{#each weekDays as day, i}
				<div
					class="py-3 text-center text-sm font-medium {i === 0
						? 'text-red-500'
						: i === 6
							? 'text-blue-500'
							: 'text-stone-600'}"
				>
					{day}
				</div>
			{/each}
		</div>

		<!-- Calendar days -->
		<div class="grid grid-cols-7">
			{#each calendarDays as { date, isCurrentMonth }, index}
				{@const dayEvents = getEventsForDay(date)}
				{@const dayOfWeek = date.getDay()}
				<div
					class="min-h-24 p-1 border-b border-r border-stone-100 {!isCurrentMonth
						? 'bg-stone-50'
						: 'bg-white'} {index % 7 === 6 ? 'border-r-0' : ''}"
				>
					<div class="flex flex-col h-full">
						<span
							class="inline-flex items-center justify-center w-7 h-7 text-sm rounded-full
							{isToday(date) ? 'bg-stone-900 text-white font-semibold' : ''}
							{!isToday(date) && !isCurrentMonth ? 'text-stone-400' : ''}
							{!isToday(date) && isCurrentMonth && dayOfWeek === 0 ? 'text-red-500' : ''}
							{!isToday(date) && isCurrentMonth && dayOfWeek === 6 ? 'text-blue-500' : ''}"
						>
							{date.getDate()}
						</span>

						<!-- Events -->
						<div class="flex flex-col gap-0.5 mt-1 overflow-hidden">
							{#each dayEvents.slice(0, 3) as event}
								<button
									type="button"
									class="text-xs px-1.5 py-0.5 rounded truncate text-left w-full hover:opacity-80 transition-opacity cursor-pointer"
									style="background-color: {event.color || '#6366f1'}20; color: {event.color ||
										'#6366f1'};"
									title="{event.title} - {event.allDay ? 'ทั้งวัน' : formatTime(event.start)}"
									onclick={() => onEventClick?.(event)}
								>
									{#if !event.allDay}
										<span class="font-medium">{formatTime(event.start)}</span>
									{/if}
									{event.title}
								</button>
							{/each}
							{#if dayEvents.length > 3}
								<div class="text-xs text-stone-500 px-1.5">+{dayEvents.length - 3} อื่นๆ</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
