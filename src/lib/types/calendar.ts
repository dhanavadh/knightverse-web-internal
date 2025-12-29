export interface CalendarSource {
	name: string;
	url: string;
	color?: string;
}

export interface CalendarEvent {
	id: string;
	title: string;
	description?: string;
	location?: string;
	start: Date;
	end: Date;
	allDay: boolean;
	source: string;
	color?: string;
}

export interface CalendarDay {
	date: Date;
	isCurrentMonth: boolean;
	isToday: boolean;
	events: CalendarEvent[];
}

export interface CalendarMonth {
	year: number;
	month: number;
	days: CalendarDay[];
}
