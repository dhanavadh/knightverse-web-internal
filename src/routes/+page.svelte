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
	<title>KnightVerse Group – บริษัทพัฒนาซอฟต์แวร์ โซลูชั่นดิจิทัลสำหรับธุรกิจ</title>
	<meta
		name="description"
		content="บริษัท ไนท์ เวิร์ส กรุ๊ป จำกัด ผู้เชี่ยวชาญด้านการพัฒนาซอฟต์แวร์ระบบ ซอฟต์แวร์จัดการฐานข้อมูล โปรแกรมประยุกต์เพิ่มประสิทธิภาพธุรกิจ พร้อมให้บริการ Digital Solutions ครบวงจร"
	/>
	<meta
		name="keywords"
		content="พัฒนาซอฟต์แวร์, software development, ซอฟต์แวร์ระบบ, ซอฟต์แวร์จัดการฐานข้อมูล, โปรแกรมสำเร็จรูป, digital solutions, บริษัทพัฒนาซอฟต์แวร์, KnightVerse Group, ไนท์เวิร์ส"
	/>
	<link rel="canonical" href="https://knightversegroup.com/" />

	<!-- OpenGraph -->
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content="KnightVerse Group – บริษัทพัฒนาซอฟต์แวร์ โซลูชั่นดิจิทัลสำหรับธุรกิจ"
	/>
	<meta
		property="og:description"
		content="บริษัท ไนท์ เวิร์ส กรุ๊ป จำกัด ผู้เชี่ยวชาญด้านการพัฒนาซอฟต์แวร์ระบบ ซอฟต์แวร์จัดการฐานข้อมูล โปรแกรมประยุกต์เพิ่มประสิทธิภาพธุรกิจ"
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
	<meta
		name="twitter:title"
		content="KnightVerse Group – บริษัทพัฒนาซอฟต์แวร์ โซลูชั่นดิจิทัลสำหรับธุรกิจ"
	/>
	<meta
		name="twitter:description"
		content="บริษัท ไนท์ เวิร์ส กรุ๊ป จำกัด ผู้เชี่ยวชาญด้านการพัฒนาซอฟต์แวร์ระบบ ซอฟต์แวร์จัดการฐานข้อมูล โปรแกรมประยุกต์เพิ่มประสิทธิภาพธุรกิจ"
	/>
	<meta
		name="twitter:image"
		content="https://knightversegroup.com/api/og?title=KnightVerse%20Group"
	/>
</svelte:head>

<div class="flex flex-col items-center justify-center w-full py-32">
	<section
		class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center w-full max-w-7xl px-6"
	>
		<!-- Left: Text Content -->
		<div class="flex flex-col gap-4 items-start lg:col-span-2">
			<div class="text-start text-4xl md:text-5xl text-stone-700/90 font-light">
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
		</div>

		<!-- Right: Screenshot Preview -->
		<div class="lg:col-span-3 overflow-hidden rounded-xl aspect-[4/3] md:aspect-video">
			<img
				src="/preview/scs2.webp"
				alt="ดูฟอร์ม - ระบบแปลเอกสารอัตโนมัติ"
				class="w-full h-full object-cover shadow-2xl border border-stone-200 rounded-xl"
			/>
		</div>
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
