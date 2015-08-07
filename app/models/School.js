var mongoose = require('mongoose');

module.exports = mongoose.model('School', mongoose.Schema({
        name: String,
        street: String,
        city: String,
        state: String,
        zip: String,
        phone: String,
        enrollment: String,
        contacts : [mongoose.Schema.Types.ObjectId]
    })
);