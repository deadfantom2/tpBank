var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// chat Schema
var ChatSchema = mongoose.Schema({
    userId:         { type: String, required: true },
    name:           { type: String, required: true },
    message:        { type: String, required: true }
},                  { timestamps: true });

var Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;



