import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface JobDetails {
	id: number;
	title: string;
	location: string;
	company: string;
	department: string;
	type: string;
	date: string;
	description: string;
	responsibilities: string[];
	qualifications: string[];
	benefits: string[];
}

const jobDetails: Record<string, JobDetails> = {
	'2903': {
		id: 2903,
		title: 'Software Engineer (Frontend)',
		location: 'Phaya Thai, Bangkok',
		company: 'Knight Verse Group',
		department: 'Product',
		type: 'Contract',
		date: 'Dec 1, 2025 ~ Jan 31, 2026',
		description:
			'We are looking for a passionate Frontend Software Engineer to join our team. You will be responsible for building and maintaining user-facing features for our web applications using modern technologies like React, Vue, or Svelte.',
		responsibilities: [
			'Develop and maintain responsive web applications',
			'Collaborate with designers and backend engineers to implement new features',
			'Write clean, maintainable, and well-documented code',
			'Participate in code reviews and provide constructive feedback',
			'Optimize applications for maximum speed and scalability',
			'Stay up-to-date with emerging technologies and industry trends'
		],
		qualifications: [
			"Bachelor's degree in Computer Science or related field",
			'Proficiency in JavaScript/TypeScript, HTML, and CSS',
			'Experience with modern frontend frameworks (React or Svelte)',
			'Familiarity with RESTful APIs and version control systems (Git)',
			'Strong problem-solving skills and attention to detail'
		],
		benefits: [
			'Flexible working hours',
			'Remote work options',
			'Annual leave and sick leave',
			'Professional development opportunities'
		]
	},
	'2904': {
		id: 2904,
		title: 'Marketing Strategy',
		location: 'Phaya Thai, Bangkok',
		company: 'Knight Verse Group',
		department: 'Marketing',
		type: 'Contract',
		date: 'Dec 1, 2025 ~ Jan 31, 2026',
		description:
			'We are looking for a creative and data-driven Marketing Strategist to join our team. You will be responsible for developing and executing marketing strategies to drive brand awareness, customer acquisition, and business growth.',
		responsibilities: [
			'Develop and implement comprehensive marketing strategies',
			'Analyze market trends and competitor activities',
			'Plan and execute digital marketing campaigns across multiple channels',
			'Collaborate with product and sales teams to align marketing efforts',
			'Track and report on marketing KPIs and campaign performance',
			'Manage marketing budget and optimize ROI'
		],
		qualifications: [
			'Strong analytical skills and data-driven decision making',
			'Experience with digital marketing tools and platforms',
			'Excellent communication and presentation skills'
		],
		benefits: [
			'Flexible working hours',
			'Remote work options',
			'Annual leave and sick leave',
			'Professional development opportunities'
		]
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const job = jobDetails[params.id];

	if (!job) {
		throw error(404, 'Job not found');
	}

	return { job };
};
