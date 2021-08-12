const puppeteer = require('puppeteer')

async function getMeaning(meaning) {
	let res
	let err = 'לא מצאתי מידע על' + meaning
	try {
		let url = `https://google.com/search?q=פירוש ${meaning}&hl=he`
		const browser = await puppeteer.launch()
		const context = await browser.createIncognitoBrowserContext()
		const page = await context.newPage()
		await page.goto(url)
		let body = await page.$('body')
		if (body) {
			await page.waitForSelector('h2')
			let meaningResult = await page.evaluate(() => {
				let isDictionary =
					[...document.querySelectorAll('h2')].filter(x => x.innerText === 'מילון').length > 0
				if (isDictionary) {
					return [...document.querySelectorAll('ol li span')]
						.map(x => x.innerText)
						.filter(x => !x.match(/[\d]/g) && x !== '.' && !x.includes('ראו'))
            .join('')
				}
			})
			res = meaningResult
		} else {
			return err
		}
		return res
	} catch (error) {
		console.log(error)
	}

	await context.close()
}

module.exports = getMeaning
