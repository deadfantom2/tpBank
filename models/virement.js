var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// virement Schema
var VirementSchema = mongoose.Schema({
    userId:      { type: String, required: true },
    intitule:    { type: String, required: true },
    somme:       { type: String, required: true },
    description: { type: String, required: true},
    date:        { type: Date, required: true },
    destinataire:   { type: String, required: false },
    crediteur:      { type: String, required: false }
},  { timestamps: true });

var Virement = mongoose.model('Virement', VirementSchema);

module.exports = Virement;



