var BPromise = require('bluebird');
var express = require('express');
var router = express.Router();

var userUtils = require('../utils/userUtils');

router.get('/', (req, res, next) => {
    userUtils.findAllUsers(eq.query.lastUserId ? req.query.lastUser: null).then(users => {
        return res.status(200).json(users.Items)
    }).catch(err => {
        return res.status(400).json({error: err})
    })
})

router.post('/', (req, res, next) => {
    userUtils.insertUser(req.body).then(user => {
        return res.status(200).json({success: req.body})
    }).catch(err => {
        return res.status(400).json({error: err})
    })
})

router.get('/:userId', (req, res, next) => {
    userUtils.finduserById(req.params.userId).then(user => {
        if(user) return res.status(200).json(user)
        return res.status(400).json({message: "user not found"})
    }).catch(err => {
        return res.status(400).json({error: err})
    })
})


module.exports = router;