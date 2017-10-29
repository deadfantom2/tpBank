var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route

var User        = require('../models/user');    // import data models user


// Afficher la page d'inscription
router.get('/register', function (req, res) {
    res.send({info: 'Get method regisgter'});
});

// Création du compte Utilisateur
router.post('/register', function (req, res) {
    console.log(req.body);

    var user = new User();
        user.nom = req.body.nom;
        user.prenom = req.body.prenom;
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        user.save();
});

// Utilisateur met à jour son profile
router.put('/profile/user/:id', function (req, res) {  // : change id item
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {   // met à jour les idintifiants selon son id

        // Rechercher utilisateur après inscription pour finir la requete
        User.findOne({_id: req.params.id}).then(function (user) {
            res.send(user);
        });
    });
});

// Supprimer utilisateur dans la DB
router.delete('/profile/user/:id', function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}).then(function (user) {         // On passe dans la requete id d'utilisateur pour supprimmer son compte
        res.send(user);
    });
});


module.exports = router;  // import routes CRUD into a another file



/* POST   http://localhost:3000/register
 {
 "nom": "val",
 "prenom": "sch",
 "email": "fr@.fr",
 "username": "frfr",
 "password": "frfr"
 }
*/

/*  PUT  http://localhost:3000/profile/user/:id <- à mettre
 {
 "nom": "val444",
 "prenom": "sch444",
 "email": "fr@.fr444",
 "username": "frfr444",
 "password": "frfr444"
 }
*/

// delete   http://localhost:3000/profile/user/:id <- à mettre