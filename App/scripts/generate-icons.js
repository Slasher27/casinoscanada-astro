import sharp from 'sharp';
import { mkdir, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const MASTER_ICON = path.join(ROOT_DIR, 'public/images/icons/master-icon-512x512.png');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public/icons');

// Icon sizes to generate
const ICON_SIZES = [
	{ name: 'favicon-16x16.png', size: 16 },
	{ name: 'favicon-32x32.png', size: 32 },
	{ name: 'favicon-48x48.png', size: 48 },
	{ name: 'apple-touch-icon.png', size: 180 },
	{ name: 'android-chrome-192x192.png', size: 192 },
	{ name: 'android-chrome-512x512.png', size: 512 },
	{ name: 'mstile-150x150.png', size: 150 },
	{ name: 'icon-192x192.png', size: 192 },
	{ name: 'icon-512x512.png', size: 512 },
];

async function generateIcons() {
	console.log('🎨 Generating web app icons...\n');

	// Create output directory if it doesn't exist
	if (!existsSync(OUTPUT_DIR)) {
		await mkdir(OUTPUT_DIR, { recursive: true });
		console.log('✅ Created /public/icons/ directory\n');
	}

	// Check if master icon exists
	if (!existsSync(MASTER_ICON)) {
		console.error('❌ Master icon not found at:', MASTER_ICON);
		process.exit(1);
	}

	// Generate all icon sizes
	console.log('📦 Generating icon sizes...');
	for (const { name, size } of ICON_SIZES) {
		const outputPath = path.join(OUTPUT_DIR, name);
		await sharp(MASTER_ICON)
			.resize(size, size, {
				fit: 'contain',
				background: { r: 15, g: 23, b: 42, alpha: 1 }, // slate-900
			})
			.png()
			.toFile(outputPath);
		console.log(`  ✓ ${name} (${size}x${size})`);
	}

	// Generate maskable icon for Android (with safe zone padding)
	console.log('\n📱 Generating maskable icon for Android...');
	const maskableSize = 512;
	const padding = Math.floor(maskableSize * 0.1); // 10% padding for safe zone
	const iconSize = maskableSize - padding * 2;

	await sharp(MASTER_ICON)
		.resize(iconSize, iconSize, { fit: 'contain' })
		.extend({
			top: padding,
			bottom: padding,
			left: padding,
			right: padding,
			background: { r: 15, g: 23, b: 42, alpha: 1 }, // slate-900
		})
		.png()
		.toFile(path.join(OUTPUT_DIR, 'android-chrome-maskable-512x512.png'));
	console.log('  ✓ android-chrome-maskable-512x512.png (with safe zone)');

	// Generate ICO file (multi-resolution favicon)
	console.log('\n🔷 Generating favicon.ico (multi-resolution)...');

	// Create 16x16, 32x32, 48x48 PNGs for ICO
	const icoSizes = [16, 32, 48];
	const icoBuffers = await Promise.all(
		icoSizes.map((size) =>
			sharp(MASTER_ICON)
				.resize(size, size, {
					fit: 'contain',
					background: { r: 15, g: 23, b: 42, alpha: 1 },
				})
				.png()
				.toBuffer()
		)
	);

	// Note: Sharp doesn't support .ico format directly
	// We'll create the largest size as favicon.ico for now
	await sharp(MASTER_ICON)
		.resize(48, 48, {
			fit: 'contain',
			background: { r: 15, g: 23, b: 42, alpha: 1 },
		})
		.png()
		.toFile(path.join(ROOT_DIR, 'public/favicon.ico'));
	console.log('  ✓ favicon.ico (48x48 PNG as ICO)');
	console.log('  ℹ️  Note: Modern browsers prefer PNG favicons');

	// Generate SVG favicon (simple vector version)
	console.log('\n🎨 Creating SVG favicon...');
	const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <style>
      .bg { fill: #0f172a; }
      .leaf { fill: #dc2626; }
      @media (prefers-color-scheme: dark) {
        .bg { fill: #0f172a; }
        .leaf { fill: #ef4444; }
      }
    </style>
  </defs>
  <rect width="128" height="128" class="bg" rx="16"/>
  <path class="leaf" d="M64 25L68 42L78 42L70 50L74 67L64 59L54 67L58 50L50 42L60 42Z" transform="translate(0, 10) scale(1.2)"/>
</svg>`;

	await import('fs').then((fs) => {
		fs.writeFileSync(path.join(ROOT_DIR, 'public/favicon.svg'), svgFavicon);
	});
	console.log('  ✓ favicon.svg (vector, adapts to dark mode)');

	console.log('\n✅ All icons generated successfully!');
	console.log(`\n📁 Icons saved to: ${OUTPUT_DIR}`);
	console.log('📄 Favicons saved to: /public/');
}

generateIcons().catch((error) => {
	console.error('❌ Error generating icons:', error);
	process.exit(1);
});
