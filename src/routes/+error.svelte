<script>
	import { page } from '$app/stores';
	import GradientBackground from '$lib/components/GradientBackground.svelte';
</script>

<section class="flex flex-col w-full relative text-white font-sans min-h-screen justify-center">
	<div class="absolute inset-0 -z-0 overflow-hidden pointer-events-none bg-neutral-50"></div>
	<div class="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10 text-stone-700">
		<h1 class="text-5xl font-semibold mb-2">Page Status:</h1>
		<h1 class="text-5xl font-semibold mb-2">{$page.status}</h1>
		<p class="text-xl mb-4">
			The page you are looking for is {$page.error?.message}.
		</p>
		<a href="/" class="button-black">กลับหน้าแรก</a>
	</div>
</section>
