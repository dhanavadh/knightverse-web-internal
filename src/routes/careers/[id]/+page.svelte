<script lang="ts">
	let { data } = $props();
	const job = data.job;
</script>

<svelte:head>
	<title>{job.title} - Careers | KnightVerse Group</title>
	<meta name="description" content={job.description} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://knightversegroup.com/careers/{job.id}" />

	<!-- OpenGraph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{job.title} - {job.type} | KnightVerse Group" />
	<meta property="og:description" content={job.description} />
	<meta property="og:url" content="https://knightversegroup.com/careers/{job.id}" />
	<meta property="og:site_name" content="KnightVerse Group" />
	<meta property="og:image" content="https://knightversegroup.com/og.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="th_TH" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{job.title} - {job.type} | KnightVerse Group" />
	<meta name="twitter:description" content={job.description} />
	<meta name="twitter:image" content="https://knightversegroup.com/og.webp" />

	<!-- Job Posting Structured Data -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "JobPosting",
			"title": "${job.title}",
			"description": "${job.description}",
			"datePosted": "2025-11-03",
			"validThrough": "2025-12-31",
			"employmentType": "${job.type === 'Full-time' ? 'FULL_TIME' : job.type === 'Contract' ? 'CONTRACTOR' : job.type === 'Intern' ? 'INTERN' : 'OTHER'}",
			"hiringOrganization": {
				"@type": "Organization",
				"name": "${job.company}",
				"sameAs": "https://knightversegroup.com",
				"logo": "https://knightversegroup.com/og.webp"
			},
			"jobLocation": {
				"@type": "Place",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "${job.location}",
					"addressCountry": "TH"
				}
			},
			"industry": "${job.department}"
		}
	</script>`}
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
					<a
						href="mailto:contact@knightversegroup.com?subject=Application for {job.title}"
						class="button-black"
					>
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
