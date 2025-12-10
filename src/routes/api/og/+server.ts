import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { RequestHandler } from './$types';

// Load IBM Plex Sans Thai font - full TTF with all characters
function loadFont(): ArrayBuffer {
	const fontPath = join(process.cwd(), 'static', 'IBMPlexSansThai-Medium.ttf');
	const fontBuffer = readFileSync(fontPath);
	return fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength);
}

// Load logo SVG and convert to data URL
function loadLogoDataUrl(): string {
	const logoPath = join(process.cwd(), 'src', 'lib', 'assets', 'logo-w.svg');
	const logoSvg = readFileSync(logoPath, 'utf-8');
	const base64 = Buffer.from(logoSvg).toString('base64');
	return `data:image/svg+xml;base64,${base64}`;
}

// Load background image and convert to data URL
function loadBackgroundDataUrl(): string {
	const bgPath = join(process.cwd(), 'static', 'og_b.png');
	const bgBuffer = readFileSync(bgPath);
	const base64 = bgBuffer.toString('base64');
	return `data:image/png;base64,${base64}`;
}

export const GET: RequestHandler = async ({ url }) => {
	// Get title parameter
	const title = url.searchParams.get('title') || 'KnightVerse Group';

	// Load font, logo, and background
	let fontData: ArrayBuffer;
	let logoDataUrl: string;
	let bgDataUrl: string;
	try {
		fontData = loadFont();
		logoDataUrl = loadLogoDataUrl();
		bgDataUrl = loadBackgroundDataUrl();
	} catch (error) {
		console.error('Failed to load resources:', error);
		throw new Error('Failed to load resources');
	}

	// Generate SVG with satori using React-like element objects
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					fontFamily: 'IBM Plex Sans Thai'
				},
				children: [
					// Background image
					{
						type: 'img',
						props: {
							src: bgDataUrl,
							style: {
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								objectFit: 'cover'
							}
						}
					},
					// Content overlay
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flexDirection: 'column',
								padding: '64px',
								justifyContent: 'flex-end',
								height: '100%',
								width: '100%',
								position: 'relative'
							},
							children: {
								type: 'div',
								props: {
									style: {
										display: 'flex',
										flexDirection: 'column',
										gap: '20px'
									},
									children: [
										{
											type: 'img',
											props: {
												src: logoDataUrl,
												width: 370,
												height: 64,
												style: { objectFit: 'contain' }
											}
										},
										{
											type: 'p',
											props: {
												style: {
													fontSize: '48px',
													fontWeight: 500,
													color: 'white',
													lineHeight: 1.3,
													margin: 0
												},
												children: title
											}
										}
									]
								}
							}
						}
					}
				]
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'IBM Plex Sans Thai',
					data: fontData,
					style: 'normal',
					weight: 500
				}
			]
		}
	);

	// Convert SVG to PNG using resvg
	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: 1200
		}
	});

	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return new Response(new Uint8Array(pngBuffer), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
};
