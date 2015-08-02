var mongoose = require('mongoose');

module.exports = mongoose.model('School', mongoose.Schema({
        name: String,
        address: String,
        phone: String,
        contacts : [mongoose.Schema.Types.ObjectId]
    })
);