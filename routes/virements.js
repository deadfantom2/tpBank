var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route

var Virement    = require('../models/virement');    // import data models virment
var User        = require('../models/user');    // import data models user


//GET a list of user from the db
router.get('/register', function (req, res) {
    res.send({nom: 'name'});
});

// add a new user to the db
router.post('/register', function (req, res, next) {
        console.log(req.body);

        //virement.userId = req.user._id;
        var virement = new Virement();

        virement.userId = req.body.userId;
        virement.intitule = req.body.intitule;
        virement.somme = req.body.somme;
        virement.description = req.body.description;
        virement.date = req.body.date;
        virement.save();

});







// update a user in the db
router.put('/virement/:id', function (req, res, next) {  // : change id item
    Virement.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {  // update user selon son id

        // trouver apres method=findByIdAndUpdate, rechercher a nouveau user selon son id
        Virement.findOne({_id: req.params.id}).then(function (virement) {
            res.send(virement);
        });
    });
});


// delete a user from the db
router.delete('/virement/:id', function (req, res, next) { // : change id item
    Virement.findByIdAndRemove({_id: req.params.id}).then(function (virement) {  // supprime user selon son id
        res.send(virement);
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