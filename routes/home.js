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

// const array = []
// console.log(typeof array)

router.post('/', async (req, res) => {
    console.log(req.body);

    if (req.body.hasOwnProperty('info') === false) {
        res.json({
            error: "wrong post request"
        });
        return;
    }


    const post = req.body.info;

    const u = new urlParser(post.url);
    let host = u.hostname;
    let splHost = host.split('.');
    if (splHost.length < 3) host = 'www.' + host;
    const ref = host + u.pathname;

    if (post.order === 'check') {
        try {
            let findRefs = [];
            if (post.type === 'dofollow') {
                findRefs = await models.dofollow.find({
                    refUrl: ref
                });
            } else if (post.type === 'nofollow') {
                findRefs = await models.nofollow.find({
                    refUrl: ref
                });
            }

            res.json({
                error: null,
                refUrl: ref,
                data: findRefs
            });

        } catch (e) {
            errExeption(e, res, 'error / find process for db');
        }

    } else if (post.order === 'add') {
        try {
            if (post.type === 'dofollow') {
                await new models.dofollow({
                    refUrl: ref,
                    addUrl: u

                }).save();
            } else if (post.type === 'nofollow') {
                await new models.nofollow({
                    refUrl: ref,
                    addUrl: u

                }).save();
            }

            res.json({
                error: null,
                succeed: true
            });

        } catch (e) {
            errExeption(e, res, 'error / save process for db')
        }
    }



});

module.exports = router;


// docDof = new models.dofollow({
//     refUrl: 'www.test.com/21',
//     addUrl: 'https://www.test.com/21?aaaa'
// });
//
// docDof.save((err) => {
//     if (err) console.log(err);
// });


// 컬렉션 수정하시려면 updateMany, updateOne 함수로
// 첫번째 인자는 find query, 두번째 인자는 수정 사항인데
// 데이터 변경은 $set{ url: "example.com" }

// push array는 $push{ urls: { url: "example.com" } } // 이거
// pull array는 $pull{ urls: { url: "example.com" } } // 이거는 어레이에 추가 빼기

// $set{ url: "example.com" } 으로 하시면 돼용
// newItem = {date: string, refUrl: string, addUrl: string}