const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 375, height: 750 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Check initial (shirt 0)
  const initial = await page.evaluate(() => {
    const track = document.querySelector('#shirt-rack .hide-scrollbar');
    const card0 = track.children[0];
    const trackRect = track.getBoundingClientRect();
    const cardRect = card0.getBoundingClientRect();
    return {
      windowWidth: window.innerWidth,
      trackRectLeft: trackRect.left,
      trackRectWidth: trackRect.width,
      trackScrollLeft: track.scrollLeft,
      cardRectLeft: cardRect.left,
      cardRectWidth: cardRect.width,
      cardCenter: cardRect.left + cardRect.width / 2,
      viewportCenter: window.innerWidth / 2,
      trackCenter: trackRect.left + trackRect.width / 2
    };
  });

  console.log(JSON.stringify(initial, null, 2));
  await browser.close();
})();
