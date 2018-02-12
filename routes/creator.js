var express = require('express');
var router = express.Router();
var lib = require('my-todolist-js');
var validTokens = ['Pippo', 'Caio', 'Sempronio'];

var auth = function (req, res, next) {
    if (validTokens.includes(req.query.token)) {
        return next();
    }
    return res.status(401).json({ message: 'Invalid Token' })
}
var validId = function (req, res, next) {
    for (var i = 0; i < lib.allTodo().length; i++) {
        if (lib.allTodo()[i].id === parseInt(req.params.id)) {
            return next();
        }
    }
    return res.status(404).json({ message: 'Invalid ID' })
}

router.post('/add', auth,
    function (req, res, next) {
        for (var i = 0; i < lib.allUsers().length; i++) {
            if (lib.allUsers()[i].idUsers === req.body.idAs) {
                return next();
            }
        }
            return res.status(404).json({ message: 'idAs not found in Users' })
    },
    function (req, res, next) {
        for (var i = 0; i < lib.allUsers().length; i++) {
            if (lib.allUsers()[i].idUsers === req.body.idCr) {
                return next();
            }
        }
            return res.status(404).json({ message: 'idCr not found in Users' })
    },
    function (req, res) {
        if (req.body.idAs === req.body.idCr) {
            res.status(400).json({ message: 'Creator != Assignee' });
        } else return res.status(201).json(lib.ins(req.body));

    });

router.delete('/del/:id', auth, validId, function (req, res) {
    res.json(lib.del(parseInt(req.params.id)));
});

router.get('/notCompleted/:id', auth, validId, function (req, res) {
    res.json(lib.notCompleted(parseInt(req.params.id)));
});

router.post('/addUser', auth,
    function (req, res, next) {
        for (var i = 0; i < lib.allUsers().length; i++) {
            if (lib.allUsers()[i].idUsers === req.body.idUsers) {
                return res.status(400).json({ message: 'Duplicate ID' });
            }
        }
        return next();
    },

    function (req, res) {
        res.status(201).json(lib.addUsers(req.body));
});

router.get('/userStatus/:id', auth, function (req, res) {
    res.json(lib.todoUser(parseInt(req.params.id)));
});

router.get('/todo', auth, function (req, res) {
    res.status(200).json(lib.allTodo());
});

router.get('/statusList', auth, function (req, res) {
    res.json(lib.allTrueFalse());
});

router.get('/allUsers', auth, function (req, res) {
    res.json(lib.allUsers());
});

module.exports = router;
