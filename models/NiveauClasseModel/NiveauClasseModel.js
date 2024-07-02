const mongoose = require('mongoose');

const niveauClasseSchema = new mongoose.Schema(
  {
    name_niveau_ar: String,
    name_niveau_fr: String,
    abreviation:String
  },
  { timestamps: true }
);

module.exports = mongoose.model('NiveauClasse', niveauClasseSchema);
