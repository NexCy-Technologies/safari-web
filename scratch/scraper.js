const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  // TripAdvisor
  await page.goto('https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880-Reviews-Udawalawe_Jeep_Safari_Services-Udawalawa_Sabaragamuwa_Province.html', { waitUntil: 'networkidle2', timeout: 30000 });
  const taText = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync('ta.txt', taText);

  // Google
  await page.goto('https://share.google/ZWz22GUBHRrtKVAJV', { waitUntil: 'networkidle2', timeout: 30000 });
  // wait a bit for any map load
  await new Promise(r => setTimeout(r, 5000));
  const googleText = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync('google.txt', googleText);

  await browser.close();
})();
