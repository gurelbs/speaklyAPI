const puppeteer = require('puppeteer');

async function getTranslate(translate){
  let res;
  let err = 'לא מצאתי תרגום ל' + translate;
  try {
    let url = `https://google.com/search?q=${translate}&hl=he`
    const browser = await puppeteer.launch();
    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage();
    await page.goto(url);
    let isTranslate = await page.$('#tw-container')
    if (isTranslate){
      await page.waitForSelector('#tw-container')
        let translated = await page.evaluate(() => document.querySelector('#tw-container #tw-target-text').innerText)
        res = translated 
    } else {
      return err
    }
    return res
  } catch (error) {
    console.log(error);
  }

  await context.close();
}

module.exports = getTranslate 