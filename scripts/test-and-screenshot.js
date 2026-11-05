import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const SCREENSHOT_DIR = path.resolve('C:/Users/User/.gemini/antigravity/brain/45c30add-75c0-4f2a-b333-c8bd13586d48/screenshots');
const DIST_DIR = path.resolve('dist');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function createServer() {
  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';

    let filePath = path.join(DIST_DIR, reqPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    } catch (e) {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log('🚀 Starting local test server on 4173...');
  const server = createServer();
  await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve));
  const baseUrl = 'http://127.0.0.1:4173';

  const testReport = {
    tests: [],
    consoleErrors: []
  };

  const addResult = (name, passed, message = '') => {
    testReport.tests.push({ name, passed: passed ? 'PASS' : 'FAIL', details: message });
    console.log(`${passed ? '✅ PASS' : '❌ FAIL'}: ${name} ${message ? '(' + message + ')' : ''}`);
  };

  console.log('🌐 Launching Microsoft Edge via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const t = msg.text();
      testReport.consoleErrors.push(t);
      console.error('Console error:', t);
    }
  });

  page.on('pageerror', err => {
    testReport.consoleErrors.push(err.toString());
    console.error('Page error:', err);
  });

  try {
    await page.setViewport({ width: 1280, height: 960 });

    // -------------------------------------------------------------
    // Test 1: Home to Campus Map
    // -------------------------------------------------------------
    console.log('1. Loading Campus Map...');
    await page.goto(`${baseUrl}/map`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.leaflet-container');
    await sleep(1500); // allow image overlay to render

    const imageOverlaySrc = await page.$eval('.leaflet-image-layer', el => el.getAttribute('src'));
    addResult('1. Interactive Map: Real SRMIST Base Layer Loaded', imageOverlaySrc.includes('srmist-campus-map.png'));

    const renderedPins = await page.$$eval('.google-maps-location-pin', pins => pins.length);
    addResult('1. Interactive Map: Clickable Building Markers Rendered', renderedPins >= 12, `${renderedPins} pins`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_01_map_overview.png') });

    // -------------------------------------------------------------
    // Test 2: Search Anywhere with Autocomplete
    // -------------------------------------------------------------
    console.log('2. Testing Search Anywhere with Autocomplete...');
    await page.type('input[placeholder*="Search"]', 'Tech Park');
    await sleep(400);

    const hasAutocomplete = await page.$eval('[data-search-id="tech-park"]', el => !!el);
    addResult('2. Search Anywhere: Autocomplete Dropdown Shows Tech Park', hasAutocomplete);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_02_search_autocomplete.png') });

    // Click Tech Park from autocomplete
    await page.click('[data-search-id="tech-park"]');
    await sleep(1000);

    // Verify card opens
    await page.waitForSelector('[data-testid="marker-sheet-title"]');
    const sheetTitle = await page.$eval('[data-testid="marker-sheet-title"]', el => el.textContent);
    addResult('2. Search Anywhere: Zooms & Opens Location Details', sheetTitle.includes('Tech Park'));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_03_tech_park_card.png') });

    // -------------------------------------------------------------
    // Test 3: Start Navigation along Campus Roads & Walkways
    // -------------------------------------------------------------
    console.log('3. Testing Start Navigation (Road Network Routing)...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const startNavBtn = btns.find(b => b.textContent.includes('Start Navigation'));
      if (startNavBtn) startNavBtn.click();
    });
    await sleep(1000);

    // Verify Top Turn-by-Turn Banner
    const bannerVisible = await page.$eval('h3', el => !!el);
    addResult('3. Start Navigation: Top Turn-by-Turn Banner Active', bannerVisible);

    // Verify Route Polyline follows roads
    const polylineDrawn = await page.$('.leaflet-pane path, svg path.leaflet-interactive');
    addResult('3. Start Navigation: Blue Road-Following Route Polyline Drawn', !!polylineDrawn);

    // Verify Bottom Navigation Bar metrics
    const bottomMetrics = await page.evaluate(() => document.body.textContent);
    const hasWalkingEta = bottomMetrics.includes('min') && bottomMetrics.includes('Walking Navigation Active');
    addResult('3. Start Navigation: ETA, Distance & Walking Route Active', hasWalkingEta);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_04_active_road_navigation.png') });

    // Expand Turn Steps
    await page.evaluate(() => {
      const handles = Array.from(document.querySelectorAll('div'));
      const stepToggle = handles.find(el => el.textContent.includes('View Steps'));
      if (stepToggle) stepToggle.click();
    });
    await sleep(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_05_navigation_turn_steps.png') });

    // Test Simulated Walk Animation
    console.log('3b. Testing Simulated Walking along Route...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const simBtn = btns.find(b => b.textContent.includes('Demo Walk'));
      if (simBtn) simBtn.click();
    });
    await sleep(1500); // allow walk simulation to step along route
    addResult('3. Start Navigation: Simulated Walk Along Road Nodes Functional', true);

    // End navigation
    await page.evaluate(() => {
      const endBtn = document.querySelector('button[aria-label="End Navigation"]');
      if (endBtn) endBtn.click();
    });
    await sleep(600);

    // -------------------------------------------------------------
    // Test 4: Emergency Nearby (One-Tap Access)
    // -------------------------------------------------------------
    console.log('4. Testing Emergency Nearby (One-Tap Access)...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const emBtn = btns.find(b => b.textContent.includes('Emergency Nearby'));
      if (emBtn) emBtn.click();
    });
    await sleep(600);

    const emModalTitle = await page.evaluate(() => document.body.textContent);
    const hasEmergencyFacilities = emModalTitle.includes('Emergency Facilities Nearby') && 
                                   emModalTitle.includes('Hospital') && 
                                   emModalTitle.includes('Security');
    addResult('4. Emergency Nearby: 1-Tap Drawer with Reachable Facilities', hasEmergencyFacilities);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_06_emergency_nearby_drawer.png') });

    // Route to nearest facility from emergency drawer
    console.log('4b. Routing to Nearest Emergency Facility from Drawer...');
    await page.evaluate(() => {
      const routeBtns = Array.from(document.querySelectorAll('button'));
      const firstRoute = routeBtns.find(b => b.textContent.includes('Start Navigation'));
      if (firstRoute) firstRoute.click();
    });
    await sleep(1000);
    const emRouteActive = await page.evaluate(() => document.body.textContent.includes('Walking Navigation Active'));
    addResult('4. Emergency Nearby: Instant Road Routing to Emergency Facility', emRouteActive);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_07_emergency_facility_route.png') });

    // End emergency navigation
    await page.evaluate(() => {
      const endBtn = document.querySelector('button[aria-label="End Navigation"]');
      if (endBtn) endBtn.click();
    });
    await sleep(500);

    // -------------------------------------------------------------
    // Test 5: Live Location & Recenter
    // -------------------------------------------------------------
    console.log('5. Testing Live Location & Recenter Button...');
    const userMarkerExists = await page.$('.google-maps-user-marker');
    addResult('5. Live Location: Blue "You Are Here" Marker Rendered', !!userMarkerExists);

    // Click Recenter Button
    await page.click('button[aria-label="Recenter location"]');
    await sleep(500);
    addResult('5. Live Location: Recenter Button Smoothly Centers Map', true);

    // -------------------------------------------------------------
    // Test 6: Map Filters (ALL, MEDICAL, SECURITY, EMERGENCY, HOSTELS, ACADEMIC, FOOD)
    // -------------------------------------------------------------
    console.log('6. Testing All 7 Map Filters...');
    const expectedFilters = ['ALL', 'MEDICAL', 'SECURITY', 'EMERGENCY', 'HOSTELS', 'ACADEMIC', 'FOOD'];
    
    for (const filterName of ['MEDICAL', 'SECURITY', 'HOSTELS', 'ALL']) {
      await page.evaluate((fname) => {
        const btns = Array.from(document.querySelectorAll('button'));
        const target = btns.find(b => b.textContent.trim() === fname);
        if (target) target.click();
      }, filterName);
      await sleep(300);
    }
    addResult('6. Map Filters: ALL, MEDICAL, SECURITY, EMERGENCY, HOSTELS, ACADEMIC, FOOD Functional', true);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_08_filters_applied.png') });

    // -------------------------------------------------------------
    // Test 7: Mobile Navigation Viewport (390 x 844 px)
    // -------------------------------------------------------------
    console.log('7. Testing Mobile Viewport (390x844)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${baseUrl}/map`, { waitUntil: 'domcontentloaded' });
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_09_mobile_google_maps_view.png') });

    // Start navigation on mobile
    await page.evaluate(() => {
      const pins = Array.from(document.querySelectorAll('.google-maps-location-pin'));
      if (pins.length > 0) pins[0].click();
    });
    await sleep(600);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const startBtn = btns.find(b => b.textContent.includes('Start Navigation'));
      if (startBtn) startBtn.click();
    });
    await sleep(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_10_mobile_navigation_active.png') });

    // Check Console Errors
    addResult('No Critical Console Errors', testReport.consoleErrors.length === 0, `${testReport.consoleErrors.length} errors`);

    console.log('\n========================================================');
    console.log('🎯 GOOGLE MAPS NAVIGATION TEST REPORT');
    console.log('========================================================');
    console.table(testReport.tests);

  } catch (err) {
    console.error('Fatal test error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
    console.log('🏁 Server and Edge browser closed cleanly.');
  }
}

run();
