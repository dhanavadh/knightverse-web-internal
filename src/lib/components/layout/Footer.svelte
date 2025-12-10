<script lang="ts">
	import { Instagram, Mail } from '@lucide/svelte';
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
			title: 'Products',
			links: [
				{ label: 'Business Solutions', href: '/products' },
				{ label: 'Digital Experience', href: '/products' },
				{ label: 'Website Development', href: '/products' },
				{ label: 'CRM Integration', href: '/products' },
				{ label: 'SEO Management', href: '/products' }
			]
		},
		{
			title: 'Solutions',
			links: [
				{ label: 'E-commerce', href: '/solutions' },
				{ label: 'Analytics', href: '/solutions' },
				{ label: 'Automation', href: '/solutions' },
				{ label: 'Marketing', href: '/solutions' }
			]
		},
		{
			title: 'Learn',
			links: [
				{ label: 'Blog', href: '/blog' },
				{ label: 'Case Studies', href: '/cases' },
				{ label: 'Documentation', href: '/docs' },
				{ label: 'Resources', href: '/resources' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About Us', href: '/about' },
				{ label: 'Careers', href: '/careers' },
				{ label: 'Contact', href: '/contact' },
				{ label: 'Privacy Policy', href: '/privacy' },
				{ label: 'Terms of Service', href: '/terms' }
			]
		}
	];

	const socialLinks = [{ icon: Mail, href: 'mailto:contact@knightverse.com', label: 'Email' }];
</script>

<footer class="bg-stone-900 text-stone-300">
	<div class="mx-auto max-w-7xl px-6 py-12">
		<div class="grid grid-cols-12 gap-8">
			<div class="col-span-12 flex flex-col gap-6 md:col-span-3">
				<img src={logoWhite} alt="KnightVerse Logo" class="h-6 w-fit" />
				<div class="mt-auto flex flex-col gap-4">
					<p class="text-sm text-stone-500">© 2025 KnightVerse Group</p>
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

			<nav class="col-span-12 grid grid-cols-2 gap-8 md:col-span-9 md:grid-cols-4">
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
