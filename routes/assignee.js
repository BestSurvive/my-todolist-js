var express = require('express');
var router = express.Router();
var lib = require('my-todolist-js');
var validTokens = ['Pippo', 'Caio', 'Sempronio'];

var authUser = function (req, res, next) {
    if (validTokens.includes(req.query.token)) {
        return next();
    }
    res.status(401).json('Invalid token');
}

var validId = function (req, res, next) {
    for (var i = 0; i < lib.allTodo().length; i++) {
        if (lib.allTodo()[i].id === parseInt(req.params.id)) {
            return next();
        }
    }
    return res.status(404).json({ message: 'Invalid ID' })
}

router.get('/todo', authUser, function (req, res) {
    res.status(200).json(lib.allTodo());
});

router.get('/completed/:id', authUser, validId, function (req, res) {
        res.json(lib.completed(parseInt(req.params.id)));
    });



module.exports = router;






