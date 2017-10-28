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
var Virement = require('./models/virement');


app.use(bodyParser.json()); // Parseir applciation/json
app.use(bodyParser.urlencoded({extended: false})); // Pour parser dans la BD

/*------------Declaration Routes Avec Path definit une fois-------------------*/
app.use('/users', require('./routes/users'));               // '/' le path qui sera tjs utiliser en premier , et le routes qui contient les routes CRUD
app.use('/virements', require('./routes/virements'));


/* *************************************************Chat************************************************************* */
// Pour charger toutes les 'vues.pug' dans le dossier 'views'
app.set('views',path.join(__dirname, 'public'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, 'public'))); // Declaration du dossier public
// Chat GET
app.get('/chat', function(req, res){
    res.render('chat');
});


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