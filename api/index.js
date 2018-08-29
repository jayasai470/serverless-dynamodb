var express = require('express');
var router = express.Router();


router.get('/status', (req, res, next) => {  
  res.status(200).json({
    time: Date.now(),
    region: process.env.AWS_REGION
  });
});

router.use('/user', require('./users'));

  module.exports = router;