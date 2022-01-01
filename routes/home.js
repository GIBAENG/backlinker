const router = require('express').Router();
const urlParser = require('url-parse');
const moment = require('moment');

const models = require('../models/url.js');

// let d = new Date();
// console.log(d);
// let d2 = moment(d).format('YYYY-MM-DD-HH:mm');
// d = d2
// console.log(d);
// console.log(typeof d);

let sss = '1111111111111111111';


router.get('/', async (req, res) => {
    try {
        res.render('index');

    } catch (err) {
        console.log(err);
        res.send('server error');
    }
});

const array = []
console.log(typeof array)

router.post('/', async (req, res) => {
    console.log(req.body);


    if (req.body.hasOwnProperty('url') === false) {
        res.json({
            err: "url is not found"
        });
        console.log("url is not found");
        return;
    }

    const u = new urlParser(req.body.url);
    let host = u.hostname;
    let splHost = host.split('.');
    if (splHost.length < 3) host = 'www.' + host;

    const ref = host + u.pathname;

    try {
        let findRefs = await models.dofollow.find({
            refUrl: ref
        });
        // console.log(findRefs);

        // 그리고 또 궁금한게 만약 저 findRefs 를 typeof 로 보면 무조건 object 라고 나오자나여 좀더 자세히 타입을 알수 있는 방법이 있나요 자바스크립트에? 아뇽 추적 안돼여
        // 그래서 타입스크립트 써용 ㅋㅋ
        // 저도 처음에 아 타입스크립트 쓰면 괜히 데이터타입만 지정해서 개발속도 더뎌지는거아닌가 햇는데
        // 오히려 타입스크립트가 애매모한 상황을 안만들어주고
        // 오류 다 정확히 추적해주고
        // 실시간으로 컴파일 감시 키면 실시간으로 오류 다 알려줘여
        // 자바스크립트에서 그냥 object로 나오는것도 어떤 형식인지 다 보여주고
        // 자바스크립트에서는 배열도 object로 나와여


        // 데이트를 서버에서 가공해서 전송하는것보다
        // 클라이언트에서 포멧 지정해서 출력하면 편해용 //
        // 네넹 ㅎㅎㅎ  근데 아까 물어본거
        // 디비에서 받아온 데이터 [{date: Date 타입}]을
        //[{date: 스트링 타입}] 으로 변경한느게 불가능 한건가요??
        // 스키마는 Date로 설정돼있어서
        // 아래 처럼 스키마 지정된 아이템을 돌면서 Date에 스트링 넣는거는 안되고
        const collection = findRefs
        // 요렇게 인가용?
        // 네넹 오 좋네용 ㅎㅎㅎㅎㅎㅎ
        // 근데 궁금한게.. 디비에서 받아온 [] 데이터가 타입이 스키마 인가요? 그냥 array 아니구요?
        // 네 걍 어레이 아니고 mongoose.model 스키마로 데이터 형식이 지정돼서
        // object에 메소드 추가하거나 변경하는것처럼 하면 적용 안돼여
        // 컬렉션 수정하시려면 updateMany, updateOne 함수로
        // 첫번째 인자는 find query, 두번째 인자는 수정 사항인데
        // 데이터 변경은 $set{ url: "example.com" }
        // 만약 schema에 urls 라는 배열이 있을때 // 아 네넹 음 해봐야 정확히 알거 같네요 ㅋㅋ
        // push array는 $push{ urls: { url: "example.com" } } // 이거
        // pull array는 $pull{ urls: { url: "example.com" } } // 이거는 어레이에 추가 빼기
        // 정도 있어용 ㅋㅋ 푸쉬는 추가인구 pull 은 뭔가요??
        // 단순 데이터필드에 정보 변경하는거는
        // $set{ url: "example.com" } 으로 하시면 돼용
        // newItem = {date: string, refUrl: string, addUrl: string}
        const newCollection = []
        for (const c of collection) {
            newCollection.push({
                date: moment(c.date).format("YYYY-MM-DD-HH:mm"),
                refUrl: "http://example.com/page/1",
                addUrl: "example.com"
            })
        }
        // console.log(newCollection)
        res.json({
            err: null,
            data: newCollection
        })
        return

        // for (let obj of findRefs) {
        //
        //     console.log(obj.date);
        //
        //     const dd = obj.date;
        //     // console.log(dd instanceof Date);
        //     const d = moment(obj.date).format('YYYY-MM-DD-HH:mm');
        //     console.log(d);
        //     // console.log(typeof d);
        //     // JSON.stringify(obj.date);
        //     // obj.refUrl = 'wwwwwwwwwwwww';
        //     // obj.date.setPrototypeOf('', null);
        //     obj.date = d;
        //     // obj.date = 'stringgggg';
        //     // console.log(obj['date']);
        //
        //     console.log(obj.date);
        //
        // }

        res.json({
            err: null,
            data: findRefs
        })
        // console.log(typeof findRefs);

        // console.log(findRefs.length);



    } catch (e) {
        console.log(e)
        res.json({
            err: "Server error",
            data: null
        })
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