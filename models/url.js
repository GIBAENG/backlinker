const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dofollow = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    refUrl: {
        type: String,
        required: true
    },
    addUrl: {
        type: String,
        required: true
    }
});

const nofollow = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    refUrl: {
        type: String,
        required: true
    },
    addUrl: {
        type: String,
        required: true
    }
});

// 여기서 추축할 수 있는거는 몽구스.모델에 몽구스.스키마 형식으로 넣으면
// 몽구스.모델 객체를 반환하는거 같아요
module.exports.dofollow = mongoose.model('dofollows', dofollow);
module.exports.nofollow = mongoose.model('nofollows', nofollow);