const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 375, height: 750 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Click dot 1
  const dot1 = (await page.$$('button[aria-label^="Go to shirt"]'))[1];
  await dot1.click();
  await page.waitForTimeout(800);

  const debug1 = await page.evaluate(() => {
    const track = document.querySelector('#shirt-rack .hide-scrollbar');
    const cards = Array.from(track.children);
    return {
      trackClientWidth: track.clientWidth,
      trackBoundingLeft: track.getBoundingClientRect().left,
      trackScrollLeft: track.scrollLeft,
      trackScrollWidth: track.scrollWidth,
      cards: cards.map((c, i) => ({
        i,
        offsetLeft: c.offsetLeft,
        offsetWidth: c.offsetWidth,
        rectLeft: c.getBoundingClientRect().left,
        rectRight: c.getBoundingClientRect().right,
        rectWidth: c.getBoundingClientRect().width
      }))
    };
  });

  console.log(JSON.stringify(debug1, null, 2));
  await browser.close();
})();
