<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/logo.svg';
	import { ArrowUpRight, Menu, X } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	let { children } = $props();
	let isMenuOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>KnightVerse Group – Drive Innovation</title>
	<meta name="description" content="KnightVerse Group is a part of." />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://rinkai.co" />

	<!-- OpenGraph -->
	<meta property="og:title" content="Rinkai Industries – Rinkai Industries – Make life easier" />
	<meta
		property="og:description"
		content="Rinkai Industries is dedicated to providing innovative solutions for your business needs."
	/>
	<meta property="og:url" content="https://rinkai.co" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://rinkai.co/og-img.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Rinkai Studio" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Rinkai Industries – Rinkai Industries – Make life easier" />
	<meta
		name="twitter:description"
		content="Rinkai Industries is dedicated to providing innovative solutions for your business needs."
	/>
	<meta name="twitter:image" content="https://beta.rinkai.co/og-img.webp" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<nav
	class="w-full flex flex-col sticky top-0 left-0 right-0 z-50 bg-white border-b-[0.5px] border-solid border-neutral-200"
>
	<div class="max-w-7xl mx-auto w-full py-5 px-6 md:px-10 flex items-center justify-between">
		<a href="/" class="mr-auto">
			<img src={logo} alt="KnightVerse Logo" class="h-8 w-auto block" />
		</a>

		<div class="hidden md:flex items-center gap-2 font-medium">
			<a href="/" class="button-nav-blank">Products</a>
			<a href="/" class="button-nav-blank">Solutions</a>
			<a href="/" class="button-nav-blank">Careers</a>
			<a href="https://www.knightvisahelppoint.com/" target="_blank" class="button-nav-blank"
				>Knight Group <ArrowUpRight class="h-4 w-4" /></a
			>
			<a
				href="/"
				class="flex gap-2 items-center px-2.5 py-1.5 rounded-lg border-[0.5px] border-solid border-neutral-200 bg-neutral-50"
				>Contacts</a
			>
		</div>

		<button
			class="md:hidden flex items-center justify-center p-2 text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors"
			onclick={() => (isMenuOpen = !isMenuOpen)}
			aria-label="Toggle menu"
		>
			{#if isMenuOpen}
				<X class="h-6 w-6" />
			{:else}
				<Menu class="h-6 w-6" />
			{/if}
		</button>
	</div>

	{#if isMenuOpen}
		<div
			transition:fly={{ x: 500, opacity: 1, duration: 500 }}
			class="fixed inset-0 z-[60] bg-white flex flex-col p-6 h-screen w-full md:hidden"
		>
			<div class="flex items-center justify-between mb-8">
				<img src={logo} alt="KnightVerse Logo" class="h-8 w-auto block" />
				<button
					class="flex items-center justify-center p-2 text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors"
					onclick={() => (isMenuOpen = false)}
					aria-label="Close menu"
				>
					<X class="h-6 w-6" />
				</button>
			</div>

			<div class="flex flex-col gap-2">
				<a href="/careers" class="menu-nav" onclick={() => (isMenuOpen = false)}>Products</a>
				<a href="/link" class="menu-nav" onclick={() => (isMenuOpen = false)}>Solutions</a>
				<a href="/careers" class="menu-nav" onclick={() => (isMenuOpen = false)}>Careers</a>
				<a
					href="https://www.knightvisahelppoint.com/"
					target="_blank"
					class="menu-nav"
					onclick={() => (isMenuOpen = false)}>Knight Group <ArrowUpRight class="h-4 w-4 ml-1" /></a
				>
				<a href="/" class="menu-nav" onclick={() => (isMenuOpen = false)}>Contacts</a>
			</div>
		</div>
	{/if}
</nav>
{@render children()}
<footer
	class="flex min-h-fit w-full flex-col items-center justify-center gap-4 px-12 pb-4 font-sans"
>
	<img src="https://www.rinkai.co/images/logo-b.svg" alt="Icon" class="h-8 w-fit" />
	<div class="gap2 flex flex-col items-center text-neutral-700">
		<a href="https://www.rinkai.co/" class="underline decoration-2 underline-offset-4"
			>© 2025 Rinkai Industries</a
		>
	</div>
	<div class="flex flex-col rounded-lg bg-neutral-100 p-2.5 text-neutral-700">
		<code>Staging Environment</code>
	</div>
</footer>
