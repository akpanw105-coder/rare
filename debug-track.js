const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 375, height: 750 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const debug = await page.evaluate(() => {
    const section = document.querySelector('#shirt-rack');
    const container = section.querySelector('.max-w-7xl');
    const railWrapper = section.querySelector('.relative.mx-auto.mb-4');
    const track = document.querySelector('#shirt-rack .hide-scrollbar');
    const cards = Array.from(track.children);

    return {
      windowWidth: window.innerWidth,
      sectionWidth: section.offsetWidth,
      containerWidth: container.offsetWidth,
      containerLeft: container.getBoundingClientRect().left,
      railWrapperWidth: railWrapper.offsetWidth,
      railWrapperLeft: railWrapper.getBoundingClientRect().left,
      trackClientWidth: track.clientWidth,
      trackOffsetLeft: track.offsetLeft,
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

  console.log(JSON.stringify(debug, null, 2));
  await browser.close();
})();
