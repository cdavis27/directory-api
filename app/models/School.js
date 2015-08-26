var mongoose = require('mongoose');

module.exports = mongoose.model('School', mongoose.Schema({
        name: String,
        address: {
            street: String,
            city: String,
            state: String,
            zip: String
        },
        phone: String,
        enrollment: Number,
        contacts: [{
            name: String,
            position: String,
            contact: String,
            img: String
        }]
    })
);