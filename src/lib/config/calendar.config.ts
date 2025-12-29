import type { CalendarSource } from '$lib/types/calendar';

/**
 * Configure your ICS calendar sources here.
 * Each source should have a unique name, URL, and optional color.
 *
 * Example sources:
 * - Google Calendar: https://calendar.google.com/calendar/ical/{calendar_id}/public/basic.ics
 * - iCloud Calendar: Use the public sharing URL
 * - Outlook: Export or use the ICS subscription URL
 */
export const calendarSources: CalendarSource[] = [
	// Add your ICS sources here
	{
		name: 'ประชุม',
		url: 'https://outlook.office365.com/owa/calendar/a7b456a9a35e4848b64f2056451cb0b1@knightversegroup.com/5209a719677e4421853a8cd57e0417a47787352183595249762/calendar.ics',
		color: '#E5A700'
	},
	{
		name: 'Personal',
		url: 'https://outlook.office365.com/owa/calendar/a7b456a9a35e4848b64f2056451cb0b1@knightversegroup.com/ae7ba8ba382b42eca3e23206cc330d3213946008711336897337/calendar.ics',
		color: '#34a853'
	},
	{
		name: 'Leave',
		url: 'https://outlook.office365.com/owa/calendar/a7b456a9a35e4848b64f2056451cb0b1@knightversegroup.com/d94ba845333b4637b48b660357d27f1310717718569037699648/calendar.ics',
		color: '#000000'
	}
];
