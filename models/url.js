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
    addUrl: {
        type: String,
        required: true
    },
    alike: [String]
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