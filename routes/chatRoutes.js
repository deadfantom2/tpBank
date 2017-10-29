var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route

var User        = require('../models/user');    // import data models


// Chat GET
router.get('/chat', function(req, res){
    res.render('chat');
});



module.exports = router;  // import routes CRUD into a another file





