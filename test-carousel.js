const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });

  const viewports = [320, 360, 375, 390, 430];
  const results = {};

  for (const width of viewports) {
    const context = await browser.newContext({
      viewport: { width, height: 750 }
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    results[width] = [];

    // Check each shirt card position from index 0 to 5
    for (let i = 0; i < 6; i++) {
      // Click dot or arrow to navigate to shirt i
      const dot = (await page.$$('button[aria-label^="Go to shirt"]'))[i];
      if (dot) {
        await dot.click();
        await page.waitForTimeout(600); // wait for scroll/transition
      }

      const evalData = await page.evaluate((idx) => {
        const track = document.querySelector('#shirt-rack .hide-scrollbar');
        if (!track) return { error: 'No track found' };
        const cards = track.children;
        const activeCard = cards[idx];
        if (!activeCard) return { error: 'No card found' };

        const cardRect = activeCard.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const cardCenter = cardRect.left + cardRect.width / 2;
        const viewportCenter = viewportWidth / 2;
        const diff = cardCenter - viewportCenter;

        return {
          idx,
          viewportWidth,
          cardWidth: cardRect.width,
          cardLeft: cardRect.left,
          cardRight: cardRect.right,
          cardCenter: Math.round(cardCenter),
          viewportCenter: Math.round(viewportCenter),
          offsetFromCenter: Math.round(diff),
          isClippedLeft: cardRect.left < 0,
          isClippedRight: cardRect.right > viewportWidth
        };
      }, i);

      results[width].push(evalData);
    }

    await context.close();
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
