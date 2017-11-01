var express     = require('express');               // ExperssJS Framework
var router      = express.Router();                 // var global route
var passport    = require('passport');

var Virement    = require('../models/virement');    // import data models virment
var User        = require('../models/user');        // import data models user





// Filtre future
router.get('/filtre', passport.authenticate('jwt', { session: false }), function(req, res) {


    Virement.find({}, function(err, virement){       // trouver totues mes reservations
        if(err){
            res.status(0).json(err);
        }else{
            res.status(200).json(virement);
        }
    }).sort({"date": 1});              // --- 1 for asc and -1 for desc



});



// Afficher la page des virements
router.get('/virements', passport.authenticate('jwt', { session: false }), function(req, res) {

    Virement.find({}, function(err, virement){       // trouver totues mes reservations
        if(err){
            res.status(0).json(err);
        }else{
            res.status(200).json(virement);
        }
    });

});

// Faire le virement
router.post('/virement', passport.authenticate('jwt', { session: false }), function(req, res) {


        var virement = new Virement();
            virement.userId = req.user._id;
            virement.intitule = req.body.intitule;
            virement.somme = req.body.somme;
            virement.description = req.body.description;
            virement.date = req.body.date;

            /*
            $timeout(function () {  // angular method timeout 2ms
                $location.path('/about');  // angular methode redirect location.path
            }, 2000); // on stop le redirect pendant 2 ms
            */

           /*
            function myFunc(arg) {
                virement.save();
            }
            setTimeout(myFunc, 1000, 'funky');
*/
            virement.save();
});





// Modifier le virement
router.put('/virement/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    Virement.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {       // mettre à jour le virement selon son id

        // afficher le virement après la requete, finir la requete
        Virement.findOne({_id: req.params.id}).then(function (virement) {
            res.send(virement);
        });
    });
});

// Annuller le virement
router.delete('/virement/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    Virement.findByIdAndRemove({_id: req.params.id}).then(function (virement) {  // supprime user selon son id
        res.send(virement);
    });
});


module.exports = router;  // import routes CRUD into a another file



/* POST   http://localhost:3000/virement
 {
     "userId": "1",
     "intitule": "Virement 1",
     "somme": "9999",
     "description": "Achat voiture",
     "date": "22/22/2017"
 }
*/

/*  PUT  http://localhost:3000/virement/:id <- à mettre
 {
     "userId": "1",
     "intitule": "Virement 1",
     "somme": "9999",
     "description": "Achat voiture",
     "date": "22/22/2017"
 }
*/

// delete   http://localhost:3000/virement/:id <- à mettre