const router = require('express').Router();
const urlParser = require('url-parse');

const models = require('../models/url.js');

router.get('/popper', async (req, res) => {
    res.send('Popper page - get');

});

router.post('/popper', async (req, res) => {
    res.send('Popper page - post');

});

module.exports = router;