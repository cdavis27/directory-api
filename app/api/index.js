var express     = require('express');
var router      = express.Router();

// Model imports
var School     = require('../models/School');

var upload     = require('../middleware/multer-upload');

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

    var school = new School(req.body);

    school.save(function (err, data) {
        if (err) {
            res.send('create failed');
            return;
        }
        res.json(data);
    });
});

// update
router.put('/schools/:id', function (req, res) {
    School.findOne({_id: req.params.id}, function (err, data) {
        if (!data) {
            res.send('id not found');
            return;
        }
        for (var key in req.body) {
            console.log('data[', key, '] = ', req.body[key]);
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

router.post('/pictures', upload.array('picture'), function(req, res) {
    res.send('ok');
});

router.get('/verify', function(req, res) {
    res.json({ success: true });
});

module.exports = router;