var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route

var User        = require('../models/user');    // import data models


// Chat GET
// Chat GET
router.get('/chat', function(req, res){

    //User.findOne(req.user._id, function(err, user){       // trouver totues mes reservations
    User.findOne(function(err, user){       // trouver totues mes reservations
        if(err){
            console.log(err);
        }else{
            // envoit dans la vue les reservations
            res.render('chat',{ user:user});
        }
    });




});


module.exports = router;  // import routes CRUD into a another file





