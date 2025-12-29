<script lang="ts">
	import { Mail } from '@lucide/svelte';
	import logoWhite from '$lib/assets/logo-w.svg';

	interface FooterLink {
		label: string;
		href: string;
	}

	interface FooterGroup {
		title: string;
		links: FooterLink[];
	}

	const footerGroups: FooterGroup[] = [
		{
			title: 'Labs',
			links: [
				{ label: 'LINE CRM', href: '/products' },
				{ label: 'Dooform', href: '/products' },
				{ label: 'Social Monitoring', href: '/products' },
				{ label: 'Placeholder Model', href: '/products' }
			]
		},
		{
			title: 'Plan Resources',
			links: [
				{ label: 'ปฎิทิน', href: '/solutions' },
				{ label: 'บันทึกประชุม', href: '/solutions' },
				{ label: 'ความคืบหน้า', href: '/solutions' }
			]
		},
		{
			title: 'Business',
			links: [
				{ label: 'ROI Calculator', href: '/blog' },
				{ label: 'Business Plan', href: '/cases' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'ข้อมูลบริษัท', href: '/about' },
				{ label: 'รายการค่าใช้จ่าย', href: '/careers' },
				{ label: 'ติดต่อแจ้งปัญหา', href: '/contact' },
				{ label: 'ขอสิทธิ์เข้าใช้งาน M365', href: '/contact' }
			]
		}
	];

	const socialLinks = [{ icon: Mail, href: 'mailto:contact@knightversegroup.com', label: 'Email' }];
</script>

<footer class="bg-stone-900 text-stone-300">
	<div class="mx-auto max-w-7xl px-6 py-12">
		<div class="grid grid-cols-12 gap-8">
			<div class="col-span-12 flex flex-col gap-6 md:col-span-4">
				<img src={logoWhite} alt="KnightVerse Logo" class="h-6 w-fit" />

				<!-- Company Info -->
				<div class="flex flex-col gap-3 text-sm">
					<div>
						<p class="font-medium text-white">บริษัท ไนท์ เวิร์ส กรุ๊ป จำกัด</p>
						<p class="text-stone-400">KNIGHT VERSE GROUP CO., LTD.</p>
					</div>
					<p class="text-stone-500">เลขทะเบียน: 0105568223482</p>
					<address class="not-italic text-stone-400">
						499/40 ถนนลาดกระบัง แขวงลาดกระบัง<br />
						เขตลาดกระบัง กรุงเทพมหานคร 10520
					</address>
				</div>

				<div class="mt-auto flex flex-col gap-4">
					<p class="text-sm text-stone-500">© 2025 KnightVerse Group. All rights reserved.</p>
					<ul class="flex gap-3">
						{#each socialLinks as social}
							<li>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.label}
									class="flex h-6 w-6 items-center justify-center text-stone-400 transition-colors hover:text-white"
								>
									<social.icon size={20} />
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<nav class="col-span-12 grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
				{#each footerGroups as group}
					<div class="flex flex-col gap-4">
						<h3 class="text-sm font-medium text-white">{group.title}</h3>
						<ul class="flex flex-col gap-2">
							{#each group.links as link}
								<li>
									<a
										href={link.href}
										class="text-sm text-stone-400 transition-colors hover:text-white"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</div>
	</div>
</footer>
