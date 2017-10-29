var express             = require('express');
var socket              = require('socket.io');
var path                = require('path');
var bodyParser          = require('body-parser');
var config              = require('./config/database');
var mongoose            = require('mongoose');
var bcrypt              = require('bcrypt');
var morgan              = require('morgan');
var passport            = require('passport');
var expressJWT          = require('express-jwt');
var jwt                 = require('jsonwebtoken');
mongoose.connect(config.database);
var db                  = mongoose.connection;
var MongoStore = require('connect-mongo');

// bring in passport strategy we just defined
require('./config/passport')(passport);

// Init App
var app = express();


// Declaration Models
var User     = require('./models/user');
var Virement = require('./models/virement');


app.use(bodyParser.json());                         // Parseir applciation/json
app.use(bodyParser.urlencoded({extended: false}));  // Pour parser dans la BD
app.use(morgan('dev'));                             // voir log status des pages
app.use(passport.initialize());                     // initialise passport for user

/*------------Declaration Routes Avec Path definit une fois-------------------*/
app.use('/',   require('./routes/userRoutes'));
app.use('/',   require('./routes/virementRoutes'));
app.use('/',   require('./routes/chatRoutes'));


/* *************************************************Chat************************************************************* */
// Pour charger toutes les 'vues.pug' dans le dossier 'views'
app.set('views',path.join(__dirname, 'public'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, 'public'))); // Declaration du dossier public




///////////////////////////////////////////////////////////////////////////////////////////////////////


// create api group rotues
var apiRoutes = express.Router();


// Register new users
apiRoutes.post('/register', function(req, res) {
    if(!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter email and password.' });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        // Attempt to save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({ success: false, message: 'That email address already exists.'});
            }
            res.json({ success: true, message: 'Successfully created new user.' });
        });
    }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
apiRoutes.post('/authenticate', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 180 // in seconds
                    });
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
});

// Protect dashboard route with JWT
apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});

// Set url for API group routes
app.use('/api', apiRoutes);



///////////////////////////////////////////////////////////////////////////////////////////////////////


// Start Server
var server = app.listen(3000, function(){
    console.log('Server started on port 3000');
});

// socket setup
var io =  socket(server); // setup on notre serveur 3000

io.on('connection', function (socket) {
    //listen chat message
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

}); //connection from browser