<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>KnightVerse Group – Drive Innovation</title>
	<meta name="description" content="KnightVerse Group – พร้อมนำ Digital Solutions มอบให้คุณ" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://knightversegroup.com/" />

	<!-- OpenGraph -->
	<meta property="og:title" content="KnightVerse Group – พร้อมนำ Digital Solutions มอบให้คุณ" />
	<meta
		property="og:description"
		content="KnightVerse Group พร้อมเสนอโซลูชั่นสำหรับธุรกิจทุกขนาด"
	/>
	<meta property="og:url" content="https://knightversegroup.com/" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://knightversegroup.com/og.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Knight Verse Group Cover Image" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="KnightVerse Group – พร้อมนำ Digital Solutions มอบให้คุณ" />
	<meta
		name="twitter:description"
		content="KnightVerse Group พร้อมเสนอโซลูชั่นสำหรับธุรกิจทุกขนาด"
	/>
	<meta name="twitter:image" content="https://knightversegroup.com/og.webp" />

	<!-- Structured Data (JSON-LD) -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "KnightVerse Group",
			"url": "https://knightversegroup.com",
			"logo": "https://knightversegroup.com/og.webp",
			"description": "KnightVerse Group พร้อมเสนอโซลูชั่นสำหรับธุรกิจทุกขนาด",
			"sameAs": []
		}
	</script>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": "KnightVerse Group",
			"url": "https://knightversegroup.com"
		}
	</script>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<Navbar />
{@render children()}
<Footer />
