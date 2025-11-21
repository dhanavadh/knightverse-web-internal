<script lang="ts">
	import GradientBackground from '$lib/components/GradientBackground.svelte';
</script>

<div class="flex flex-col items-center justify-center w-full">
	<section class="flex flex-col w-full relative text-blue-800 font-google">
		<GradientBackground />
		<div class="flex flex-col w-full max-w-7xl mx-auto pt-64 pb-8 py-5 px-6 md:px-10 relative z-10">
			<h1 class="text-5xl font-semibold mb-2">Welcome to SvelteKit</h1>
			<p class="text-xl">
				Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
			</p>
		</div>
	</section>
	<section class="flex h-screen">
		<h1>Welcome to SvelteKit</h1>
		<p>
			Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
		</p>
	</section>
</div>
