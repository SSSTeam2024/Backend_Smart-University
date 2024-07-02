const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
  nom_fr: String,
  nom_ar: String,
  prenom_fr: String,
  prenom_ar: String,
  date_naissance_fr: String,
  date_naissance_ar: String,
  nationalite: String,
  num_CIN: String,
  face_1_CIN: String,
  face_2_CIN: String,
  fiche_paiement: String,
  state:String,
  dependency:String,
  code_postale:String,
  adress_ar:String,
  adress_fr:String,
  num_phone:String,
  email:String,
  nom_pere:String,
  job_pere:String,
  nom_mere:String,
  num_phone_tuteur:String,
  moyen:String,
  



  




},
{ timestamps: true });

module.exports = mongoose.model('Etudiant', etudiantSchema);