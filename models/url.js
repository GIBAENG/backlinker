const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchUrl = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    host: {
        type: String,
        require: true
    },
    refUrl: {
        type: String,
        required: true
    },
    prmUrl: {
        type: String,
        required: true
    },
    arrAlike: [String],
    notice: {
        memo: {
            type: String,
            require: true
        },
        noAnker: {
            type: Boolean,
            default: false
        },
        noLink: {
            type: Boolean,
            default: false
        },
        noHangul: {
            type: Boolean,
            default: false
        },
        isWiki: {
            type: Boolean,
            default: false
        }
    }
});

// const nofollow = new Schema({
//     date: {
//         type: Date,
//         default: Date.now()
//     },
//     host: {
//         type: String,
//         require: true
//     },
//     refUrl: {
//         type: String,
//         required: true
//     },
//     addUrl: {
//         type: String,
//         required: true
//     }
// });

module.exports.dofollow = mongoose.model('dofollows', SchUrl);
module.exports.nofollow = mongoose.model('nofollows', SchUrl);