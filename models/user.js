var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// user Schema
var UserSchema = mongoose.Schema({
    nom:       { type: String, required: true },
    prenom:    { type: String, required: true },
    email:     { type: String, required: true },
    username:  { type: String, required: true},
    password:  { type: String, required: true }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;