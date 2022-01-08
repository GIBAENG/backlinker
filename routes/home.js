const router = require('express').Router();
const urlParser = require('url-parse');
const moment = require('moment');

const models = require('../models/url.js');

function errExeption(err, res, msg) {
    console.log(err);
    res.json({
        error: msg
    });
}

router.get('/', async (req, res) => {
    try {
        res.render('index');

    } catch (err) {
        console.log(err);
        res.send('server error');
    }
});

router.post('/', async (req, res) => {
    // console.log(req.body);

    if (req.body.hasOwnProperty('info') === false) {
        res.json({
            error: "wrong post request"
        });
        return;
    }


    const post = req.body.info;

    let model = {};
    if (post.type === 'dofollow') model = models.dofollow;
    else if (pos.type === 'nofollow') model = models.nofollow;

    const u = new urlParser(post.url);
    const ref = u.hostname + u.pathname;


    if (post.order === 'check') {
        try {
            const _find = await model.findOne({
                arrAlike: u.href
            });

            if (_find != null) {
                res.json({
                    error: null,
                    find: _find,
                    refUrl: ref,
                    host: u.hostname,
                    refList: null,
                    hstList: null
                });

            } else {
                let findRefs = await model.find({
                    refUrl: ref
                });
                let findHsts = await model.find({
                    host: u.hostname
                });

                for (h of findRefs) {
                    const hId = h._id.toHexString();
                    const match = findHsts.findIndex(el => {
                        return el._id.toHexString() === hId;
                    });
                    if (match != -1) findHsts.splice(match);
                }

                res.json({
                    error: null,
                    find: null,
                    refUrl: ref,
                    host: u.hostname,
                    refList: findRefs,
                    hstList: findHsts
                });
            }

        } catch (e) {
            console.log(e);
            errExeption(e, res, 'error / find process for db');
        }


    } else if (post.order === 'add') {
        try {
            if (post.dbID === 'default') {
                await new model({
                    host: u.hostname,
                    refUrl: ref,
                    prmUrl: u.href,
                    arrAlike: u.href,
                    notice: post.notice
                }).save();

            } else {
                await model.updateOne({
                    _id: post.dbID
                }, {
                    $push: {
                        arrAlike: u.href
                    }
                });
            }

            res.json({
                error: null,
                type: post.type
            });

        } catch (e) {
            errExeption(e, res, 'error / save process for db')
        }
    }

});


module.exports = router;


//