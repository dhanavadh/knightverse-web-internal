import type { PageServerLoad } from './$types';
import { calendarSources } from '$lib/config/calendar.config';
import { fetchAllCalendars } from '$lib/utils/ics-parser';
import type { CalendarEvent } from '$lib/types/calendar';

export const load: PageServerLoad = async () => {
	let events: CalendarEvent[] = [];

	if (calendarSources.length > 0) {
		events = await fetchAllCalendars(calendarSources);
	}

	// Serialize dates for JSON transport
	const serializedEvents = events.map((event) => ({
		...event,
		start: event.start.toISOString(),
		end: event.end.toISOString()
	}));

	return {
		events: serializedEvents,
		sources: calendarSources.map((s) => ({ name: s.name, color: s.color }))
	};
};
