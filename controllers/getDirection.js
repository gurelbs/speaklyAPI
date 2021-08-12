const puppeteer = require('puppeteer');

async function getDirection(from, to){
  let res;
  let err = `לא מצאתי מידע על מסלול מ ${from} ל-${to}`
  try {
    let url = `https://google.com/search?q=מסלול ${from} ${to}&hl=he`
    const browser = await puppeteer.launch();
    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage();
    await page.goto(url);
    let isDirection = await page.$("[role='listitem']")
    if (isDirection){
      await page.waitForSelector("[role='listitem']")
        let directionResult = await page.evaluate(() => document
          .querySelector("[role='listitem']").innerText
          .split('\t')
          .map(x => x.split('\n'))
          .map( x => x.filter(el => el !== ''))
        )
        res = {
          result: directionResult[0],
          direction: directionResult[1]

        }
    } else {
      return err
    }
    return res
  } catch (error) {
    console.log(error);
  }

  await context.close();
}

module.exports = getDirection 