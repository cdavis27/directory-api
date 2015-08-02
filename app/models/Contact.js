var mongoose = require('mongoose');

module.exports = mongoose.model('Contact', mongoose.Schema({
        name: String,
        position: String
    })
);