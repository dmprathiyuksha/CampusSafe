import path from 'path';
import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:3000/map';
const OUT_DIRS = [
  path.resolve('docs/screenshots'),
  path.resolve('C:/Users/User/.gemini/antigravity/brain/45c30add-75c0-4f2a-b333-c8bd13586d48/screenshots')
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function capture() {
  console.log('🌐 Launching browser to capture Demo V1 screenshots...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  console.log('Navigating to', URL);
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await sleep(1500); // allow Leaflet base layer and pins to fully render

  // 1. Screenshot Main Campus Map
  console.log('Capturing Main Campus Map...');
  for (const dir of OUT_DIRS) {
    await page.screenshot({ path: path.join(dir, 'main_map_demo_v1.png') });
  }

  // 2. Open Emergency Nearby Drawer
  console.log('Opening Emergency Nearby Drawer...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const emBtn = btns.find(b => b.textContent.includes('Emergency Nearby'));
    if (emBtn) emBtn.click();
  });
  await sleep(800);

  // 3. Screenshot Emergency Drawer
  console.log('Capturing Emergency Nearby Drawer...');
  for (const dir of OUT_DIRS) {
    await page.screenshot({ path: path.join(dir, 'emergency_drawer_demo_v1.png') });
  }

  await browser.close();
  console.log('✅ Both screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
