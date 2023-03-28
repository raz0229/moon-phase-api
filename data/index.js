import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export const getMoonPhase = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
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

