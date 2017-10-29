var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var bcrypt      = require('bcrypt');

// user Schema
var UserSchema = mongoose.Schema({
    nom:       { type: String  },
    prenom:    { type: String  },
    email:     { type: String, required: true },
    username:  { type: String },
    password:  { type: String, required: true }
});


// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


var User = mongoose.model('User', UserSchema);

module.exports = User;