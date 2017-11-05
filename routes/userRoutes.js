var express     = require('express');           // ExperssJS Framework
var router      = express.Router();             // var global route
var jwt         = require('jsonwebtoken');
var passport    = require('passport');

var config      = require('../config/database');
var User        = require('../models/user');    // import data models user



//test rotue
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.' + req.user.email);
});


// Création du compte Utilisateur
router.post('/register', function(req, res) {
    if(!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter email and password.' });
    } else {
        var newUser = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // Attempt to save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({ success: false, message: 'Email already exists'});
            }
            res.json({ success: true, message: 'User created!' });
        });
    }
});

// Route pour s'authentifier
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 9000 // 15 minutes
                    });
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
});

// log out
router.get('/logout', function(req, res){
    req.logOut();
    res.status(200).send({ success: true});
});

// Utilisateur met à jour son profile
router.put('/profile/user/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {   // met à jour les idintifiants selon son id

        // Rechercher utilisateur après inscription pour finir la requete
        User.findOne({_id: req.params.id}).then(function (user) {
            res.send(user);
        });
    });
});

// Supprimer utilisateur dans la DB
router.delete('/profile/user/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
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