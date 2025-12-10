<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="robots" content="index, follow" />

	<!-- Structured Data (JSON-LD) - Organization -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "บริษัท ไนท์ เวิร์ส กรุ๊ป จำกัด",
			"alternateName": ["KNIGHT VERSE GROUP CO., LTD.", "KnightVerse Group"],
			"url": "https://knightversegroup.com",
			"logo": "https://knightversegroup.com/og.webp",
			"description": "การจัดทำซอฟต์แวร์ระบบ ซอฟต์แวร์ระบบปฏิบัติการ ซอฟต์แวร์ระบบเครือข่าย ซอฟต์แวร์จัดการฐานข้อมูล ซอฟต์แวร์ที่เป็นเครื่องมือในการพัฒนาโปรแกรม ชุดคำสั่งโปรแกรมประยุกต์ที่ใช้ในการเพิ่มประสิทธิภาพทางธุรกิจ",
			"foundingDate": "2025-11-17",
			"taxID": "0105568223482",
			"email": "contact@knightversegroup.com",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "499/40 ถนนลาดกระบัง",
				"addressLocality": "แขวงลาดกระบัง เขตลาดกระบัง",
				"addressRegion": "กรุงเทพมหานคร",
				"postalCode": "10520",
				"addressCountry": "TH"
			},
			"areaServed": {
				"@type": "Country",
				"name": "Thailand"
			},
			"knowsAbout": [
				"Software Development",
				"System Software",
				"Database Management Software",
				"Business Applications",
				"Web Development",
				"Digital Solutions"
			],
			"sameAs": []
		}
	</script>

	<!-- Structured Data (JSON-LD) - WebSite -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": "KnightVerse Group",
			"alternateName": "บริษัท ไนท์ เวิร์ส กรุ๊ป จำกัด",
			"url": "https://knightversegroup.com",
			"potentialAction": {
				"@type": "SearchAction",
				"target": "https://knightversegroup.com/search?q={search_term_string}",
				"query-input": "required name=search_term_string"
			}
		}
	</script>

	<!-- Structured Data (JSON-LD) - LocalBusiness -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "LocalBusiness",
			"@id": "https://knightversegroup.com/#business",
			"name": "บริษัท ไนท์ เวิร์ส กรุ๊ป จำกัด",
			"alternateName": "KNIGHT VERSE GROUP CO., LTD.",
			"image": "https://knightversegroup.com/og.webp",
			"url": "https://knightversegroup.com",
			"email": "contact@knightversegroup.com",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "499/40 ถนนลาดกระบัง",
				"addressLocality": "แขวงลาดกระบัง",
				"addressRegion": "กรุงเทพมหานคร",
				"postalCode": "10520",
				"addressCountry": "TH"
			},
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": 13.7291,
				"longitude": 100.7567
			},
			"priceRange": "$$",
			"currenciesAccepted": "THB",
			"paymentAccepted": "Cash, Credit Card, Bank Transfer"
		}
	</script>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
