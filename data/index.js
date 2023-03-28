import playwright from 'playwright';


export const getMoonPhase = async () => {
  const browser = await playwright.chromium.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://phasesmoon.com/');
  const moonPhase = await page.$eval('.dateselected', headerElm => {

    const src = headerElm.nextElementSibling.src

    return {
      src
    }
  });

  await browser.close();

  return moonPhase;

}