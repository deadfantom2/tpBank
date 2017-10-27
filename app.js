var express             = require('express');
var socket              = require('socket.io');
var path                = require('path');
var bodyParser          = require('body-parser');
var expressValidator    = require('express-validator');
var flash               = require('connect-flash');
var session             = require('express-session');
var passport            = require('passport');
var config              = require('./config/database');
var mongoose            = require('mongoose');
mongoose.connect(config.database);
var db              = mongoose.connection;
var MongoStore = require('connect-mongo')(session);



// Init App
var app = express();


// Declaration Models
var User = require('./models/user');


app.use(bodyParser.json()); // Parseir applciation/json
app.use(bodyParser.urlencoded({extended: false})); // Pour parser dans la BD

/*------------Declaration Routes Avec Path definit une fois-------------------*/
app.use('/users', require('./routes/users'));               // '/' le path qui sera tjs utiliser en premier , et le routes qui contient les routes CRUD
app.use('/virements', require('./routes/virements'));

// Start Server
var server = app.listen(3000, function(){
    console.log('Server started on port 3000');
});