<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = container.offsetWidth;
		let height = container.offsetHeight;

		// Set canvas resolution
		const dpr = window.devicePixelRatio || 1;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		ctx.scale(dpr, dpr);

		const fontSize = 16;
		const columns = Math.ceil(width / fontSize);
		const rows = Math.ceil(height / fontSize);

		const chars = '01';

		let time = 0;

		function draw() {
			if (!ctx) return;

			// Clear background with slightly warm off-white for less eye strain
			ctx.fillStyle = '#fdfdfd';
			ctx.fillRect(0, 0, width, height);

			ctx.font = `${fontSize}px monospace`;

			// Slower animation speed (reduced from 0.005)
			time += 0.0015;

			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < columns; x++) {
					// Normalize coordinates
					const u = x / columns;
					const v = y / rows;

					// Slower, gentler waves
					const v1 = Math.sin(u * 3 + time); // Reduced frequency from 5
					const v2 = Math.sin(v * 3 + time * 0.5);
					const v3 = Math.sin((u + v) * 3 + time * 0.8);

					const value = v1 + v2 + v3;

					// More pastel/neutral palette
					// Hue: Narrower range centered on soft blue-grey (210)
					const hue = 210 + value * 10;

					// Saturation: Much lower for "eye friendly" (greyer)
					const saturation = 30 + value * 5;

					// Lightness: Higher/Lighter (85-95%)
					const lightness = 85 + value * 2;

					// Alpha: Lower opacity (0.1 - 0.3) so it's very subtle
					const alpha = 0.2 + (value + 3) / 20;

					ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

					const charIndex = Math.floor(Math.abs(value * 10)) % chars.length;
					const char = chars[charIndex];

					ctx.fillText(char, x * fontSize, y * fontSize);
				}
			}

			requestAnimationFrame(draw);
		}

		draw();

		const handleResize = () => {
			width = container.offsetWidth;
			height = container.offsetHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.scale(dpr, dpr);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div
	bind:this={container}
	class="absolute inset-0 -z-0 overflow-hidden pointer-events-none bg-neutral-50"
>
	<canvas bind:this={canvas} class="block w-full h-full"></canvas>
</div>
