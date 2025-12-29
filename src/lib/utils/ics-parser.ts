import ICAL from 'ical.js';
import type { CalendarEvent, CalendarSource } from '$lib/types/calendar';

/**
 * Fetch and parse an ICS file from a URL
 */
export async function fetchIcsCalendar(
	source: CalendarSource
): Promise<CalendarEvent[]> {
	try {
		const response = await fetch(source.url, {
			headers: {
				'User-Agent': 'KnightVerse Calendar/1.0'
			}
		});

		if (!response.ok) {
			console.error(`Failed to fetch calendar from ${source.url}: ${response.status}`);
			return [];
		}

		const icsData = await response.text();
		return parseIcsData(icsData, source);
	} catch (error) {
		console.error(`Error fetching calendar from ${source.url}:`, error);
		return [];
	}
}

/**
 * Helper to create a CalendarEvent from ICAL.Event and occurrence time
 */
function createEventFromOccurrence(
	event: ICAL.Event,
	occurrenceStart: ICAL.Time,
	isAllDay: boolean,
	source: CalendarSource,
	occurrenceIndex: number
): CalendarEvent {
	// Calculate duration
	const duration = event.duration;

	let startDate: Date;
	let endDate: Date;

	if (isAllDay) {
		// For all-day events, use date components directly
		startDate = new Date(
			occurrenceStart.year,
			occurrenceStart.month - 1,
			occurrenceStart.day,
			0, 0, 0, 0
		);

		if (duration) {
			// Calculate end date from duration
			const endTime = occurrenceStart.clone();
			endTime.addDuration(duration);
			// ICS uses exclusive end dates, subtract one day
			endDate = new Date(
				endTime.year,
				endTime.month - 1,
				endTime.day - 1,
				23, 59, 59, 999
			);

			// If end is before start, set end = start
			if (endDate < startDate) {
				endDate = new Date(startDate);
				endDate.setHours(23, 59, 59, 999);
			}
		} else {
			endDate = new Date(startDate);
			endDate.setHours(23, 59, 59, 999);
		}
	} else {
		// For timed events
		startDate = occurrenceStart.toJSDate();

		if (duration) {
			const endTime = occurrenceStart.clone();
			endTime.addDuration(duration);
			endDate = endTime.toJSDate();
		} else {
			endDate = new Date(startDate);
		}
	}

	return {
		id: `${event.uid || crypto.randomUUID()}_${occurrenceIndex}`,
		title: event.summary || 'Untitled Event',
		description: event.description || undefined,
		location: event.location || undefined,
		start: startDate,
		end: endDate,
		allDay: isAllDay,
		source: source.name,
		color: source.color
	};
}

/**
 * Parse ICS data string into CalendarEvent array
 */
export function parseIcsData(
	icsData: string,
	source: CalendarSource
): CalendarEvent[] {
	const events: CalendarEvent[] = [];

	// Define the range for recurring events
	const rangeStart = ICAL.Time.fromJSDate(new Date(), false);
	rangeStart.month -= 1; // Include past month

	const rangeEnd = ICAL.Time.fromJSDate(new Date(), false);
	rangeEnd.year += 1; // Include next year

	try {
		const jcalData = ICAL.parse(icsData);
		const comp = new ICAL.Component(jcalData);
		const vevents = comp.getAllSubcomponents('vevent');

		for (const vevent of vevents) {
			const event = new ICAL.Event(vevent);

			// Check if it's an all-day event
			const dtstart = vevent.getFirstProperty('dtstart');
			const isAllDay = dtstart?.getParameter('value') === 'DATE' || event.startDate?.isDate === true;

			// Check if this is a recurring event
			if (event.isRecurring()) {
				// Expand recurring events
				const iterator = event.iterator();
				let occurrenceTime = iterator.next();
				let occurrenceIndex = 0;
				const maxOccurrences = 500; // Limit to prevent infinite loops

				while (occurrenceTime && occurrenceIndex < maxOccurrences) {
					// Check if occurrence is within our range
					if (occurrenceTime.compare(rangeEnd) > 0) {
						break; // Past our range, stop iterating
					}

					if (occurrenceTime.compare(rangeStart) >= 0) {
						// Within range, add this occurrence
						events.push(
							createEventFromOccurrence(event, occurrenceTime, isAllDay, source, occurrenceIndex)
						);
					}

					occurrenceTime = iterator.next();
					occurrenceIndex++;
				}
			} else {
				// Non-recurring event
				if (!event.startDate) continue;

				events.push(
					createEventFromOccurrence(event, event.startDate, isAllDay, source, 0)
				);
			}
		}
	} catch (error) {
		console.error(`Error parsing ICS data for ${source.name}:`, error);
	}

	return events;
}

/**
 * Fetch events from multiple calendar sources
 */
export async function fetchAllCalendars(
	sources: CalendarSource[]
): Promise<CalendarEvent[]> {
	const results = await Promise.allSettled(
		sources.map((source) => fetchIcsCalendar(source))
	);

	const allEvents: CalendarEvent[] = [];

	for (const result of results) {
		if (result.status === 'fulfilled') {
			allEvents.push(...result.value);
		}
	}

	// Sort events by start date
	allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

	return allEvents;
}

/**
 * Get events for a specific date range
 */
export function filterEventsByDateRange(
	events: CalendarEvent[],
	start: Date,
	end: Date
): CalendarEvent[] {
	return events.filter((event) => {
		const eventStart = event.start.getTime();
		const eventEnd = event.end.getTime();
		const rangeStart = start.getTime();
		const rangeEnd = end.getTime();

		// Event overlaps with range if:
		// event starts before range ends AND event ends after range starts
		return eventStart <= rangeEnd && eventEnd >= rangeStart;
	});
}

/**
 * Get events for a specific day
 */
export function getEventsForDay(
	events: CalendarEvent[],
	date: Date
): CalendarEvent[] {
	const dayStart = new Date(date);
	dayStart.setHours(0, 0, 0, 0);

	const dayEnd = new Date(date);
	dayEnd.setHours(23, 59, 59, 999);

	return filterEventsByDateRange(events, dayStart, dayEnd);
}
