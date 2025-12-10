<script lang="ts">
	const jobs = [
		{
			id: 2903,
			title: 'Software Engineer (Frontend)',
			location: 'Phaya Thai, Bangkok',
			company: 'Knight Verse Group',
			department: 'Corporate',
			type: 'Contract',
			date: 'Nov 3, 2025 ~ Dec 31, 2025',
			isNew: false
		}
	];
</script>

<svelte:head>
	<title>Careers - KnightVerse Group</title>
	<meta name="description" content="ร่วมงานกับ KnightVerse Group - ตำแหน่งงานที่เปิดรับสมัคร" />
</svelte:head>

<div class="flex flex-col items-center justify-center w-full">
	<section class="flex flex-col max-w-7xl px-6 gap-4 items-start pt-32 pb-8 w-full bg-stone-800">
		<div class="text-white">
			<p class="mb-2 ml-1">ร่วมงานกับเรา</p>
			<h1 class="text-5xl">Careers</h1>
		</div>
	</section>
	<section class="flex flex-col max-w-7xl px-6 gap-4 items-start pt-8 pb-16 w-full">
		<div class="w-full">
			<p class="mb-2 text-xl text-stone-700">ตำแหน่งที่เปิดรับ</p>
			<p class="mb-2 text-stone-500">{jobs.length} ตำแหน่ง</p>

			<ul class="job_list">
				{#each jobs as job (job.id)}
					<li>
						<a href="/careers/{job.id}">
							<h3 class="title">
								{job.title}
								{#if job.isNew}
									<span class="label new">NEW</span>
								{/if}
							</h3>
							<div class="text_filter">
								<span>{job.location}</span> |
								<span>{job.company}</span>
								<span>{job.department}</span> |
								<span>{job.type}</span> |
							</div>
							<span class="date">{job.date}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>

<style>
	.job_list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.job_list li {
		border-bottom: 1px solid #e7e5e4;
	}

	.job_list a {
		display: block;
		padding: 1.25rem 0;
		text-decoration: none;
		transition: background-color 0.2s ease;
	}

	.job_list a:hover {
		background-color: #fafaf9;
		padding-left: 1rem;
		padding-right: 1rem;
		margin-left: -1rem;
		margin-right: -1rem;
	}

	.job_list .title {
		font-size: 1.125rem;
		font-weight: 500;
		color: #44403c;
		margin: 0 0 0.5rem 0;
	}

	.job_list .label.new {
		font-size: 0.625rem;
		font-weight: 600;
		color: white;
		background-color: #22c55e;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		text-transform: uppercase;
		margin-left: 0.5rem;
		vertical-align: middle;
	}

	.job_list .text_filter {
		font-size: 0.875rem;
		color: #78716c;
		margin-bottom: 0.375rem;
	}

	.job_list .text_filter span {
		color: #57534e;
	}

	.job_list .date {
		font-size: 0.8125rem;
		color: #a8a29e;
	}

	@media (max-width: 640px) {
		.job_list .title {
			font-size: 1rem;
		}

		.job_list .text_filter {
			font-size: 0.8125rem;
		}
	}
</style>
