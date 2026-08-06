import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Master 4096x4096 SVG
const masterSvg = `<svg width="4096" height="4096" viewBox="0 0 4096 4096" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Apple Premium Dark Squircle Gradient -->
    <linearGradient id="appleBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#222429" />
      <stop offset="35%" stop-color="#17181C" />
      <stop offset="100%" stop-color="#0E0F12" />
    </linearGradient>

    <!-- Glass Rim Highlight Gradient -->
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.18" />
      <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.0" />
    </linearGradient>

    <!-- Drop Shadow for Icon Depth -->
    <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.55" />
    </filter>
  </defs>

  <!-- Apple Squircle Outer Box (rx=920 for 4096x4096 -> continuous 22.5% squircle curvature) -->
  <rect x="0" y="0" width="4096" height="4096" rx="920" ry="920" fill="url(#appleBgGrad)" />

  <!-- Glass Top Specular Rim Highlight -->
  <rect x="24" y="24" width="4048" height="4048" rx="896" ry="896" fill="none" stroke="url(#rimGrad)" stroke-width="24" opacity="0.9" />

  <!-- Central HealthOrbit Official White Pulse Wave Symbol -->
  <g filter="url(#iconShadow)">
    <path 
      d="M 1128 2048 L 1504 2048 C 1664 2048, 1712 1288, 1808 1288 C 1904 1288, 2128 2808, 2224 2808 C 2320 2808, 2384 2048, 2544 2048 L 2968 2048" 
      fill="none" 
      stroke="#FFFFFF" 
      stroke-width="272" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
  </g>
</svg>`;

// Standard 512x512 SVG
const standardSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="appleBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#222429" />
      <stop offset="35%" stop-color="#17181C" />
      <stop offset="100%" stop-color="#0E0F12" />
    </linearGradient>

    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.18" />
      <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.0" />
    </linearGradient>

    <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#000000" flood-opacity="0.55" />
    </filter>
  </defs>

  <!-- Apple Squircle Outer Box -->
  <rect x="0" y="0" width="512" height="512" rx="115" ry="115" fill="url(#appleBgGrad)" />

  <!-- Glass Top Specular Rim -->
  <rect x="3" y="3" width="506" height="506" rx="112" ry="112" fill="none" stroke="url(#rimGrad)" stroke-width="3" opacity="0.9" />

  <!-- Central HealthOrbit Official White Pulse Wave Symbol -->
  <g filter="url(#iconShadow)">
    <path 
      d="M 141 256 L 188 256 C 208 256, 214 161, 226 161 C 238 161, 266 351, 278 351 C 290 351, 298 256, 318 256 L 371 256" 
      fill="none" 
      stroke="#FFFFFF" 
      stroke-width="34" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
  </g>
</svg>`;

async function generateAllAssets() {
  const publicDir = path.resolve('./public');
  const distDir = path.resolve('./dist');

  console.log('Writing master SVG assets...');
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), standardSvg);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), standardSvg);

  const targets = [
    { filename: 'healthorbit-logo-4k.png', size: 4096, source: masterSvg },
    { filename: 'pwa-4096x4096.png', size: 4096, source: masterSvg },
    { filename: 'pwa-512x512.png', size: 512, source: masterSvg },
    { filename: 'android-chrome-512x512.png', size: 512, source: masterSvg },
    { filename: 'maskable-icon-512x512.png', size: 512, source: masterSvg },
    { filename: 'pwa-384x384.png', size: 384, source: masterSvg },
    { filename: 'pwa-256x256.png', size: 256, source: masterSvg },
    { filename: 'pwa-192x192.png', size: 192, source: masterSvg },
    { filename: 'android-chrome-192x192.png', size: 192, source: masterSvg },
    { filename: 'maskable-icon-192x192.png', size: 192, source: masterSvg },
    { filename: 'apple-touch-icon.png', size: 180, source: masterSvg },
    { filename: 'windows-tile-150x150.png', size: 150, source: masterSvg },
    { filename: 'mstile-150x150.png', size: 150, source: masterSvg },
    { filename: 'favicon-48x48.png', size: 48, source: masterSvg },
    { filename: 'favicon-32x32.png', size: 32, source: masterSvg },
    { filename: 'favicon-16x16.png', size: 16, source: masterSvg },
  ];

  for (const t of targets) {
    const outPath = path.join(publicDir, t.filename);
    console.log(`Generating ${t.filename} (${t.size}x${t.size})...`);
    await sharp(Buffer.from(t.source))
      .resize(t.size, t.size)
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(outPath);

    if (fs.existsSync(distDir)) {
      const distOutPath = path.join(distDir, t.filename);
      fs.copyFileSync(outPath, distOutPath);
    }
  }

  // Copy 32x32 to favicon.ico
  const favicon32Path = path.join(publicDir, 'favicon-32x32.png');
  const faviconIcoPath = path.join(publicDir, 'favicon.ico');
  fs.copyFileSync(favicon32Path, faviconIcoPath);
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(favicon32Path, path.join(distDir, 'favicon.ico'));
  }

  console.log('All icons generated successfully!');
}

generateAllAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
