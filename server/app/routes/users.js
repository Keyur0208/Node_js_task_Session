var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getdata', function(req, res, next) {
  if(req.session.data)
  {
    const userId = req.session.data;
    res.json({ userId });
  }
  else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;
