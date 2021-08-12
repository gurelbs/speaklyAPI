const express = require('express');
// controllers
const getweather = require('../controllers/getweather');
const getTranslate = require('../controllers/getTranslate');
const getMeaning = require('../controllers/getMeaning');
const getDirection = require('../controllers/getDirection');
const getNews = require('../controllers/getNews');
// router
const router = express.Router();

router.get('/weather', async (req, res) =>  {
    try {
        let city = req.body.city
        console.log(city);
        let answer = await getweather(city);
        res.status(200).send({answer}).end()
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
    }
});

router.get('/translate', async (req,res) => {
    try {
        let translate = req.body.translate;
        console.log(translate);
        let answer = await getTranslate(translate);
        res.status(200).send({answer}).end()
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
    }

})

router.get('/meaning', async (req,res) => {
    try {
        let meaning = req.body.meaning;
        console.log(meaning);
        let answer = await getMeaning(meaning);
        res.status(200).send({answer}).end()
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
    }

})

router.get('/direction', async (req,res) => {
    try {
        let {from, to} = req.body;
        console.log(from, to);
        let answer = await getDirection(from, to);
        res.status(200).send({answer}).end()
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
    }
})
 
router.get('/news', async (req,res) => {
    try {
        let {term} = req.body;
        console.log(term);
        let answer = await getNews(term);
        res.status(200).send({answer}).end()
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
    }
})
 
module.exports = router;


// examples
// weather('נחליאל')
// weather('ניו יורק')
// weather('cdcdcdc')
// weather('אוסטרליה')
// weather('אוסטריה')

