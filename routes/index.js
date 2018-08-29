var express = require('express');
var router = express.Router();

var middleware = require('../utils/middleware')
var userUtils = require('../utils/userutils')

router.get('/', (req, res, next) => {
    res.render('users', {
        data: userUtils.findAllUsers(null)
    })
})

// all api paths
router.use('/api', require('../api'));

module.exports = router;