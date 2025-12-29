export interface Announcement {
	id: string;
	title: string;
	content: string;
	date: string;
	priority: 'normal' | 'important' | 'urgent';
	author?: string;
	link?: string;
}
