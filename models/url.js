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

module.exports.dofollow = mongoose.model('dofollows', dofollow);
module.exports.nofollow = mongoose.model('nofollows', nofollow);