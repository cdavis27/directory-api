var express     = require('express');
var router      = express.Router();             

// Model imports
var School     = require('../models/School');
var Contact    = require('../models/Contact');

// read
router.get('/schools', function (req, res) {
    School.find({}, function (err, data) {
        res.json(data);
    })
});

router.get('/schools/:id', function (req, res) {
    School.findOne({_id: req.params.id}, function (err, data) {
        if (!data) {
            res.send('id not found');
            return;
        }
        res.json(data);
    })
});

// create
router.post('/schools', function (req, res) {

    var school = new School ({
        'name': req.body.name,
        'address': req.body.address,
        'phone': req.body.phone
    });

    school.save(function (err, data) {
        if (err) {
            res.send('create failed');
            return;
        }
        res.send('create successful');
    });
});

// update
router.put('/schools', function (req, res) {
    School.findOne({_id: req.body._id}, function (err, data) {
        if (!data) {
            res.send('id not found');
            return;
        }
        for (var key in req.body) {
            data[key] = req.body[key];
        }
        data.save(function (err, data) {
            if (err) {
                res.send('update falied');
                return;
            }
            res.send('update successful');
        });
    });
});

// delete
router.delete('/schools/:id', function (req, res) {
    School.findOne({_id: req.params.id}, function (err, data) {
        if (!data) {
            res.send('id not found');
            return;
        }
        data.remove( function (err, data) {
            if (err) {
                res.send('delete failed');
                return;
            }
            res.send('delete successful');
        });
    });
});

module.exports = router;