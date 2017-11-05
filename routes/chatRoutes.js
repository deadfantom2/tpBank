var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var passport    = require('passport');

var Chat        = require('../models/chat');    // import data models
var User        = require('../models/user');    // import data models


// Chat GET
router.get('/chat',  passport.authenticate('jwt', { session: false }), function(req, res) {

    //User.findOne(req.user._id, function(err, user){       // trouver totues mes reservations
    User.findById(req.user._id, function(err, user){       // trouver totues mes reservations
        if(err){
            console.log(err);
        }else{
            // envoit dans la vue les reservations
res.render('./chat', {user:user});

            //res.send('chat ' + req.user._id + '.' + req.user.email + req.user.nom);
        }
    });

});



router.post('/chat', passport.authenticate('jwt', { session: false }), function(req, res) {

    var chat = new Chat();
        chat.userId = req.user._id;
        chat.name = req.user.nom;
        chat.message = req.body.message;
        chat.save();
        res.send({ success: true, message: 'Chat message saved!' });
});


module.exports = router;  // import routes CRUD into a another file





