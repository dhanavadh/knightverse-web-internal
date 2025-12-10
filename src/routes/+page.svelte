<script lang="ts">
	import { onMount } from 'svelte';

	const keywords = [
		'Digital Solution',
		'Data Analysis',
		'Infrastructure',
		'Cloud Services',
		'AI Integration'
	];

	let currentIndex = 0;
	let isSpinning = false;

	onMount(() => {
		const interval = setInterval(() => {
			isSpinning = true;
			setTimeout(() => {
				currentIndex = (currentIndex + 1) % keywords.length;
				isSpinning = false;
			}, 400);
		}, 3000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>KnightVerse Group – โซลูชั่นดิจิทัลสำหรับธุรกิจของคุณ</title>
	<meta
		name="description"
		content="KnightVerse Group พร้อมนำ Digital Solutions มอบให้คุณ โซลูชั่นที่ตอบโจทย์ธุรกิจทุกขนาด"
	/>
	<link rel="canonical" href="https://knightversegroup.com/" />

	<!-- OpenGraph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="KnightVerse Group – โซลูชั่นดิจิทัลสำหรับธุรกิจของคุณ" />
	<meta
		property="og:description"
		content="KnightVerse Group พร้อมนำ Digital Solutions มอบให้คุณ โซลูชั่นที่ตอบโจทย์ธุรกิจทุกขนาด"
	/>
	<meta property="og:url" content="https://knightversegroup.com/" />
	<meta property="og:site_name" content="KnightVerse Group" />
	<meta
		property="og:image"
		content="https://knightversegroup.com/api/og?title=KnightVerse%20Group"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="th_TH" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="KnightVerse Group – โซลูชั่นดิจิทัลสำหรับธุรกิจของคุณ" />
	<meta
		name="twitter:description"
		content="KnightVerse Group พร้อมนำ Digital Solutions มอบให้คุณ โซลูชั่นที่ตอบโจทย์ธุรกิจทุกขนาด"
	/>
	<meta
		name="twitter:image"
		content="https://knightversegroup.com/api/og?title=KnightVerse%20Group"
	/>
</svelte:head>

<div class="flex flex-col items-center justify-center w-full min-h-screen">
	<section class="flex flex-col max-w-7xl px-6 gap-4 items-start w-full h-full">
		<div class="text-start text-5xl text-stone-700/90 font-light">
			<h1 class="lotto-container">
				{#each keywords as keyword, i}
					<span
						class="lotto-item"
						class:active={i === currentIndex && !isSpinning}
						class:spinning={i === currentIndex && isSpinning}
					>
						{keyword}
					</span>
				{/each}
			</h1>
			<h1 class="shrink-0">for your business</h1>
		</div>
		<a href="mailto:contact@knightversegroup.com" class="button-black">contact us</a>
	</section>
</div>

<style>
	.lotto-container {
		display: grid;
		position: relative;
	}

	.lotto-item {
		grid-area: 1 / 1;
		opacity: 0;
		transform: translateY(20px);
		transition:
			transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
			opacity 0.3s ease;
	}

	.lotto-item.active {
		opacity: 1;
		transform: translateY(0);
	}

	.lotto-item.spinning {
		opacity: 0;
		transform: translateY(-20px);
	}
</style>
