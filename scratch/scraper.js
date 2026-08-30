const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting scraper...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // TripAdvisor
  console.log('Navigating to TripAdvisor...');
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.goto('https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880-Reviews-Udawalawe_Jeep_Safari_Services-Udawalawa_Sabaragamuwa_Province.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('Extracting TripAdvisor reviews...');
  const tripAdvisorReviews = await page.evaluate(() => {
    const reviews = [];
    const elements = document.querySelectorAll('div[data-automation="reviewCard"]');
    elements.forEach(el => {
      const name = el.querySelector('a.ui_header_link')?.innerText || el.querySelector('span > a')?.innerText || 'Unknown';
      const text = el.querySelector('span.yCeTE')?.innerText || el.querySelector('q > span')?.innerText || '';
      if (text) {
        reviews.push({ source: 'TripAdvisor', name, reviewText: text });
      }
    });
    return reviews.slice(0, 3);
  });
  
  console.log('TripAdvisor Reviews:', JSON.stringify(tripAdvisorReviews, null, 2));

  // Google
  console.log('Navigating to Google...');
  await page.goto('https://share.google/ZWz22GUBHRrtKVAJV', { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  await new Promise(r => setTimeout(r, 5000)); // wait for redirects and load
  
  console.log('Extracting Google reviews...');
  const googleReviews = await page.evaluate(() => {
    const reviews = [];
    // Google Maps reviews usually have specific classes, we try generic selectors
    const elements = document.querySelectorAll('.jJc9Ad'); // common class for reviews
    elements.forEach(el => {
      const name = el.querySelector('.d4r55')?.innerText || 'Unknown';
      const text = el.querySelector('.wiI7pd')?.innerText || '';
      if (text) {
        reviews.push({ source: 'Google', name, reviewText: text });
      }
    });
    return reviews.slice(0, 3);
  });
  
  console.log('Google Reviews:', JSON.stringify(googleReviews, null, 2));

  await browser.close();
})();
