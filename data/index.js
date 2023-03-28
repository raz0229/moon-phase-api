//import puppeteer from "puppeteer-extra";
import chromium from 'chrome-aws-lambda';

export const getMoonPhase = async () => {
  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })

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

