import type { PageServerLoad } from './$types';
import { calendarSources } from '$lib/config/calendar.config';
import { portalLinks, announcements } from '$lib/config/portal.config';
import { fetchAllCalendars } from '$lib/utils/ics-parser';

export const load: PageServerLoad = async () => {
	// Fetch calendar events
	let events: Array<{
		id: string;
		title: string;
		description?: string;
		location?: string;
		start: string;
		end: string;
		allDay: boolean;
		source: string;
		color?: string;
	}> = [];

	if (calendarSources.length > 0) {
		const rawEvents = await fetchAllCalendars(calendarSources);

		// Get upcoming events (next 7 days)
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		const nextWeek = new Date(now);
		nextWeek.setDate(nextWeek.getDate() + 7);

		const upcomingEvents = rawEvents
			.filter((e) => e.start >= now && e.start <= nextWeek)
			.slice(0, 5);

		// Serialize dates for JSON transport
		events = upcomingEvents.map((event) => ({
			...event,
			start: event.start.toISOString(),
			end: event.end.toISOString()
		}));
	}

	return {
		events,
		portalLinks,
		announcements
	};
};
