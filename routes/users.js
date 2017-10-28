var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route

var User        = require('../models/user');    // import data models



//GET a list of user from the db
router.get('/register', function (req, res) {
    res.send({nom: 'name'});
});

// add a new user to the db
router.post('/register', function (req, res, next) {
    console.log(req.body);

    var user = new User();

        user.nom = req.body.nom;
        user.prenom = req.body.prenom;
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        user.save();
});






// update a user in the db
router.put('/user/:id', function (req, res, next) {  // : change id item
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {  // update user selon son id

        // trouver apres method=findByIdAndUpdate, rechercher a nouveau user selon son id
        User.findOne({_id: req.params.id}).then(function (user) {
            res.send(user);
        });
    });
});



// delete a user from the db
router.delete('/user/:id', function (req, res, next) { // : change id item
    User.findByIdAndRemove({_id: req.params.id}).then(function (user) {  // supprime user selon son id
        res.send(user);
    });
});


module.exports = router;  // import routes CRUD into a another file







/* POST   http://localhost:3000/crudusers/register
 {
 "nom": "val",
 "prenom": "sch",
 "email": "fr@.fr",
 "username": "frfr",
 "password": "frfr"
 }
*/

/*  PUT  http://localhost:3000/crudusers/user/59ef7e8766fa9f0218c4fc0c
 {
 "lastname": "frfr1",
 "firstname": "frfr1",
 "email": "fr@.fr1",
 "username": "frfr1",
 "password": "frfr1",
 "birthDate": "01/01/2001"
 }
*/

// delete   http://localhost:3000/crudusers/user/:id <- à mettre