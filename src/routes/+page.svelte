<script lang="ts">
	import {
		Mail,
		MessageSquare,
		Cloud,
		Calendar,
		Clock,
		MapPin,
		Megaphone,
		ExternalLink,
		AlertCircle,
		AlertTriangle,
		Info
	} from '@lucide/svelte';

	let { data } = $props();

	// Map icon names to components
	const iconMap: Record<string, typeof Mail> = {
		Mail,
		MessageSquare,
		Cloud,
		Calendar
	};

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('th-TH', {
			weekday: 'short',
			day: 'numeric',
			month: 'short'
		});
	}

	function formatTime(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
	}

	function formatAnnouncementDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('th-TH', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	function getPriorityIcon(priority: string) {
		switch (priority) {
			case 'urgent':
				return AlertCircle;
			case 'important':
				return AlertTriangle;
			default:
				return Info;
		}
	}

	function getPriorityColor(priority: string) {
		switch (priority) {
			case 'urgent':
				return 'text-red-500 bg-red-50';
			case 'important':
				return 'text-amber-500 bg-amber-50';
			default:
				return 'text-blue-500 bg-blue-50';
		}
	}
</script>

<svelte:head>
	<title>Internal Portal | KnightVerse Group</title>
	<meta name="description" content="KnightVerse Group Internal Portal" />
</svelte:head>

<div class="font-sans flex flex-col w-full">
	<div class="flex flex-col max-w-7xl mx-auto p-6 w-full min-h-screen">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-semibold text-stone-900">Internal Portal</h1>
			<p class="text-stone-500 mt-1">ยินดีต้อนรับสู่ระบบภายในของ KnightVerse Group</p>
		</div>

		<!-- Quick Links -->
		<section class="mb-8">
			<h2 class="text-lg font-semibold text-stone-800 mb-4">Quick Access</h2>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				{#each data.portalLinks as link}
					{@const IconComponent = iconMap[link.icon] || Calendar}
					<a
						href={link.url}
						target={link.url.startsWith('http') ? '_blank' : undefined}
						rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
						class="group flex flex-col items-center gap-3 p-6 bg-white border border-stone-200 rounded-xl hover:border-stone-300 hover:shadow-md transition-all"
					>
						<div
							class="w-12 h-12 rounded-xl flex items-center justify-center"
							style="background-color: {link.color || '#6366f1'}15;"
						>
							<IconComponent
								class="w-6 h-6"
								style="color: {link.color || '#6366f1'};"
							/>
						</div>
						<div class="text-center">
							<p class="font-medium text-stone-900 group-hover:text-stone-700">{link.name}</p>
							<p class="text-xs text-stone-500">{link.description}</p>
						</div>
						{#if link.url.startsWith('http')}
							<ExternalLink class="w-4 h-4 text-stone-300 group-hover:text-stone-400" />
						{/if}
					</a>
				{/each}
			</div>
		</section>

		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<!-- Announcements Section -->
			<section class="lg:col-span-2">
				<div class="flex items-center gap-2 mb-4">
					<Megaphone class="w-5 h-5 text-stone-600" />
					<h2 class="text-lg font-semibold text-stone-800">Announcements</h2>
				</div>

				<div class="bg-white border border-stone-200 rounded-xl overflow-hidden">
					{#if data.announcements.length === 0}
						<div class="p-8 text-center">
							<Megaphone class="w-12 h-12 text-stone-300 mx-auto mb-3" />
							<p class="text-stone-500">ไม่มีประกาศในขณะนี้</p>
						</div>
					{:else}
						<div class="divide-y divide-stone-100">
							{#each data.announcements as announcement}
								{@const PriorityIcon = getPriorityIcon(announcement.priority)}
								<div class="p-4 hover:bg-stone-50 transition-colors">
									<div class="flex items-start gap-3">
										<div class="p-2 rounded-lg {getPriorityColor(announcement.priority)}">
											<PriorityIcon class="w-4 h-4" />
										</div>
										<div class="flex-1 min-w-0">
											<div class="flex items-start justify-between gap-2">
												<h3 class="font-medium text-stone-900">{announcement.title}</h3>
												<span class="text-xs text-stone-400 shrink-0">
													{formatAnnouncementDate(announcement.date)}
												</span>
											</div>
											<p class="text-sm text-stone-600 mt-1">{announcement.content}</p>
											{#if announcement.author}
												<p class="text-xs text-stone-400 mt-2">โดย {announcement.author}</p>
											{/if}
											{#if announcement.link}
												<a
													href={announcement.link}
													class="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-2"
												>
													อ่านเพิ่มเติม
													<ExternalLink class="w-3 h-3" />
												</a>
											{/if}
										</div>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</section>

			<!-- Upcoming Events Section -->
			<section class="lg:col-span-1">
				<div class="flex items-center justify-between mb-4">
					<div class="flex items-center gap-2">
						<Calendar class="w-5 h-5 text-stone-600" />
						<h2 class="text-lg font-semibold text-stone-800">Upcoming Events</h2>
					</div>
					<a href="/calendar" class="text-sm text-blue-600 hover:text-blue-700">ดูทั้งหมด</a>
				</div>

				<div class="bg-white border border-stone-200 rounded-xl overflow-hidden">
					{#if data.events.length === 0}
						<div class="p-8 text-center">
							<Calendar class="w-12 h-12 text-stone-300 mx-auto mb-3" />
							<p class="text-stone-500">ไม่มีกิจกรรมในสัปดาห์นี้</p>
						</div>
					{:else}
						<div class="divide-y divide-stone-100">
							{#each data.events as event}
								<div class="p-4 hover:bg-stone-50 transition-colors">
									<div class="flex items-start gap-3">
										<div
											class="w-1 h-full rounded-full self-stretch"
											style="background-color: {event.color || '#6366f1'};"
										></div>
										<div class="flex-1 min-w-0">
											<h3 class="font-medium text-stone-900 truncate">{event.title}</h3>
											<div class="flex flex-wrap items-center gap-2 mt-1 text-sm text-stone-500">
												<span class="inline-flex items-center gap-1">
													<Clock class="w-3.5 h-3.5" />
													{formatDate(event.start)}
													{#if !event.allDay}
														{formatTime(event.start)}
													{:else}
														<span class="text-xs bg-stone-100 px-1.5 py-0.5 rounded">ทั้งวัน</span>
													{/if}
												</span>
											</div>
											{#if event.location}
												<div class="flex items-center gap-1 mt-1 text-sm text-stone-500">
													<MapPin class="w-3.5 h-3.5" />
													<span class="truncate">{event.location}</span>
												</div>
											{/if}
											<span
												class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full"
												style="background-color: {event.color || '#6366f1'}15; color: {event.color || '#6366f1'};"
											>
												{event.source}
											</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</section>
		</div>
	</div>
</div>
