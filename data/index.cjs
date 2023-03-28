let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  // running locally.
  puppeteer = require('puppeteer-extra');
}

getMoonPhase = async () => {
  const browser = await chrome.puppeteer.launch({
    args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chrome.defaultViewport,
    executablePath: await chrome.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto("https://phasesmoon.com/", {
    waitUntil: "domcontentloaded",
  });

  const moonphase = await page.evaluate(() => {
    const moon = document.querySelector('.dateselected');
    return {
      src: moon.nextElementSibling.src
    }
  });


  await browser.close();
  return moonphase;
};

module.exports = { getMoonPhase };