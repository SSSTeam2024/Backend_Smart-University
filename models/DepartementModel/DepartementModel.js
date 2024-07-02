const mongoose = require('mongoose');

const departementSchema = new mongoose.Schema({
  description: String,
  name_ar: String,
  name_fr: String,
  volume_horaire:String,
  nom_chef_dep:String,
  signature:String,
  salles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salle' }]

 
},
{ timestamps: true });

module.exports = mongoose.model('Departement', departementSchema);