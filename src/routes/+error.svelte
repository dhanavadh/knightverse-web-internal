<script>
	import { page } from '$app/stores';
	import GradientBackground from '$lib/components/GradientBackground.svelte';
</script>

<section class="flex flex-col w-full relative text-blue-800 font-google">
	<GradientBackground />
	<div class="flex flex-col w-full max-w-7xl mx-auto pt-64 pb-8 py-5 px-6 md:px-10 relative z-10">
		<h1 class="text-5xl font-semibold mb-2">Page Status:</h1>
		<h1 class="text-5xl font-semibold mb-2">{$page.status}</h1>
		<p class="text-xl">
			The page you are looking for is {$page.error?.message}.
		</p>
	</div>
</section>
<section id="error-details" class="flex flex-col w-full">
	<div class="flex flex-col w-full max-w-7xl mx-auto py-5 px-6 md:px-10 relative z-10">
		<a
			href="/"
			class="text-5xl font-semibold mb-2 hover:underline hover:underline-offset-4 hover:decoration-4"
		>
			>Go to Homepage
		</a>
	</div>
</section>
