<script lang="ts">
	import GradientBackground from '$lib/components/GradientBackground.svelte';
</script>

<svelte:head>
	<title>KnightVerse Group – โซลูชั่นดิจิทัลสำหรับธุรกิจของคุณ</title>
	<meta name="description" content="KnightVerse Group พร้อมนำ Digital Solutions มอบให้คุณ โซลูชั่นที่ตอบโจทย์ธุรกิจทุกขนาด" />
	<meta property="og:title" content="KnightVerse Group – โซลูชั่นดิจิทัลสำหรับธุรกิจของคุณ" />
	<meta property="og:description" content="KnightVerse Group พร้อมนำ Digital Solutions มอบให้คุณ โซลูชั่นที่ตอบโจทย์ธุรกิจทุกขนาด" />
	<meta name="twitter:title" content="KnightVerse Group – โซลูชั่นดิจิทัลสำหรับธุรกิจของคุณ" />
	<meta name="twitter:description" content="KnightVerse Group พร้อมนำ Digital Solutions มอบให้คุณ โซลูชั่นที่ตอบโจทย์ธุรกิจทุกขนาด" />
</svelte:head>

<div class="flex flex-col items-center justify-center w-full">
	<section class="flex flex-col w-full relative text-white font-sans">
		<GradientBackground />
		<div class="absolute inset-0 -z-0 overflow-hidden pointer-events-none bg-neutral-50">
			<img src="/bg.webp" alt="KnightVerse Group background" class="block object-cover w-full h-full brightness-70" />
		</div>
		<div
			class="flex flex-col w-full max-w-7xl mx-auto h-[50vh] justify-end pb-8 py-5 px-6 md:px-10 relative z-10"
		>
			<h1 class="text-5xl font-semibold mb-4 w-full">โซลูชั่นที่ตอบโจทย์ธุรกิจของคุณ</h1>
			<p class="text-xl">Knight Verse Group พร้อมนำ Digital Solutions มอบให้คุณ</p>
		</div>
	</section>
	<section class="flex h-screen">
		<h2>Welcome to SvelteKit</h2>
		<p>
			Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
		</p>
	</section>
</div>
