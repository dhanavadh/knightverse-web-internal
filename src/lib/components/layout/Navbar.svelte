<script lang="ts">
	import '../../../app.css';
	import logoWhite from '$lib/assets/logo-w.svg';
	import logoBlack from '$lib/assets/logo.svg';
	import { ArrowUpRight, Menu, X } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	let isMenuOpen = $state(false);
	let y = $state(0);
	let isStatic = $derived(y < 10);
</script>

<svelte:window bind:scrollY={y} />

<nav
	class={'w-full flex flex-col fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ' +
		(isStatic ? 'bg-transparent' : 'bg-white shadow-sm')}
>
	<div class="max-w-7xl mx-auto w-full py-5 px-6 md:px-10 flex items-center justify-between">
		<a href="/" class="mr-auto">
			{#if isStatic}
				<img src={logoWhite} alt="KnightVerse Logo" class="h-8 w-auto block" />
			{:else}
				<img src={logoBlack} alt="KnightVerse Logo" class="h-8 w-auto block" />
			{/if}
		</a>

		<div class="hidden md:flex items-center gap-2 font-medium">
			<a href="/products" class={isStatic ? 'button-nav-blank-state' : 'button-nav-blank-normal'}
				>Products</a
			>
			<a href="/solutions" class={isStatic ? 'button-nav-blank-state' : 'button-nav-blank-normal'}
				>Solutions</a
			>
			<a
				href="https://www.knightvisahelppoint.com/"
				target="_blank"
				class={isStatic ? 'button-nav-blank-state' : 'button-nav-blank-normal'}
				>Knight Group <ArrowUpRight class="h-4 w-4" /></a
			>
			<a href="/" class="button-white">Contacts</a>
		</div>

		<button
			class="md:hidden flex items-center justify-center p-2 text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors"
			onclick={() => (isMenuOpen = !isMenuOpen)}
			aria-label="Toggle menu"
		>
			{#if isMenuOpen}
				<X class="h-6 w-6" />
			{:else}
				<Menu class={'h-6 w-6 ' + (isStatic ? 'text-white' : 'text-neutral-800')} />
			{/if}
		</button>
	</div>

	{#if isMenuOpen}
		<div
			transition:fly={{ x: 500, opacity: 1, duration: 500 }}
			class="fixed inset-0 z-[60] bg-white flex flex-col p-6 h-screen w-full md:hidden"
		>
			<div class="flex items-center justify-between mb-8">
				<img src={logoBlack} alt="KnightVerse Logo" class="h-8 w-auto block" />
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
