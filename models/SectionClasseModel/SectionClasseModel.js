const mongoose = require('mongoose');

const sectionClasseSchema = new mongoose.Schema(
  {
    name_section_ar: String,
    name_section_fr: String,
    abreviation:String
  },
  { timestamps: true }
);

module.exports = mongoose.model('SectionClasse', sectionClasseSchema);
