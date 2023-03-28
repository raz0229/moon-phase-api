import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const LOCAL_CHROME_EXECUTABLE = '/bin/google-chrome-stable'

export const getMoonPhase = async (req, res) =>  {
  // Edge executable will return an empty string locally.
  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
  
  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
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

}
