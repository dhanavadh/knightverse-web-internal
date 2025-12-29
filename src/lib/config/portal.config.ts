import type { PortalLink } from '$lib/types/portal';
import type { Announcement } from '$lib/types/announcement';

/**
 * Configure your internal portal quick links here.
 * Icons use Lucide icon names: https://lucide.dev/icons
 */
export const portalLinks: PortalLink[] = [
	{
		id: 'email',
		name: 'Email',
		description: 'Outlook Web Access',
		url: 'https://outlook.office.com/',
		icon: 'Mail',
		color: '#0078d4'
	},
	{
		id: 'teams',
		name: 'Teams',
		description: 'Microsoft Teams',
		url: 'https://teams.microsoft.com',
		icon: 'MessageSquare',
		color: '#6264a7'
	},
	{
		id: 'drive',
		name: 'OneDrive',
		description: 'Cloud Storage',
		url: 'https://knightverse-my.sharepoint.com/',
		icon: 'Cloud',
		color: '#0078d4'
	},
	{
		id: 'calendar',
		name: 'Calendar',
		description: 'View full calendar',
		url: '/calendar',
		icon: 'Calendar',
		color: '#0078d4'
	}
];

/**
 * Configure announcements here.
 * These will be displayed on the home page.
 */
export const announcements: Announcement[] = [
	// Add announcements here
	{
		id: '1',
		title: 'Welcome to Internal Portal',
		content: 'This is the new internal portal for KnightVerse Group.',
		date: '2024-01-15',
		priority: 'normal',
		author: 'Admin'
	}
];
