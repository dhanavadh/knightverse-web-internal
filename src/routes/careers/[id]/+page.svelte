<script lang="ts">
	import { page } from '$app/stores';

	const jobDetails: Record<
		string,
		{
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
	> = {
		'2903': {
			id: 2903,
			title: 'Software Engineer (Frontend)',
			location: 'Phaya Thai, Bangkok',
			company: 'Knight Verse Group',
			department: 'Corporate',
			type: 'Contract',
			date: 'Nov 3, 2025 ~ Dec 31, 2025',
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
				'3+ years of experience in frontend development',
				'Proficiency in JavaScript/TypeScript, HTML, and CSS',
				'Experience with modern frontend frameworks (React, Vue, Svelte)',
				'Familiarity with RESTful APIs and version control systems (Git)',
				'Strong problem-solving skills and attention to detail',
				'Good communication skills in English'
			],
			benefits: [
				'Competitive salary and performance bonuses',
				'Flexible working hours',
				'Remote work options',
				'Health insurance',
				'Annual leave and sick leave',
				'Professional development opportunities',
				'Modern office in central Bangkok'
			]
		}
	};

	$: id = $page.params.id;
	$: job = jobDetails[id] || jobDetails['2903'];
</script>

<svelte:head>
	<title>{job.title} - Careers - KnightVerse Group</title>
	<meta name="description" content="{job.title} at {job.company}" />
</svelte:head>

<div class="flex flex-col items-center justify-center w-full">
	<section class="flex justify-center w-full bg-stone-800">
		<div class="flex flex-col max-w-7xl px-6 gap-4 items-start pt-32 pb-8 w-full">
			<div class="text-white">
				<a href="/careers" class="text-stone-400 hover:text-white text-sm mb-4 inline-block">
					← Back to Careers
				</a>
				<h1 class="text-4xl mb-4">{job.title}</h1>
				<div class="text_filter text-stone-300">
					<span>{job.location}</span> |
					<span>{job.company}</span>
					<span>{job.department}</span> |
					<span>{job.type}</span>
				</div>
				<p class="text-stone-400 text-sm mt-2">{job.date}</p>
			</div>
		</div>
	</section>

	<section class="flex justify-center w-full">
		<div class="flex flex-col max-w-7xl px-6 gap-8 items-start pt-8 pb-16 w-full">
		<div class="w-full max-w-3xl">
			<div class="mb-8">
				<h2 class="text-xl font-medium text-stone-700 mb-4">Job Description</h2>
				<p class="text-stone-600 leading-relaxed">{job.description}</p>
			</div>

			<div class="mb-8">
				<h2 class="text-xl font-medium text-stone-700 mb-4">Responsibilities</h2>
				<ul class="list-disc list-inside text-stone-600 space-y-2">
					{#each job.responsibilities as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>

			<div class="mb-8">
				<h2 class="text-xl font-medium text-stone-700 mb-4">Qualifications</h2>
				<ul class="list-disc list-inside text-stone-600 space-y-2">
					{#each job.qualifications as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>

			<div class="mb-8">
				<h2 class="text-xl font-medium text-stone-700 mb-4">Benefits</h2>
				<ul class="list-disc list-inside text-stone-600 space-y-2">
					{#each job.benefits as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>

			<div class="mt-12">
				<a href="mailto:careers@knightverse.com?subject=Application for {job.title}" class="button-black">
					Apply for this position
				</a>
			</div>
		</div>
		</div>
	</section>
</div>

<style>
	.text_filter span {
		margin-right: 0.25rem;
	}
</style>
