const sectionClasse = require("../../models/SectionClasseModel/SectionClasseModel");

const createSectionClasse= async (section) => {
  try {
    return await sectionClasse.create(section);
  } catch (error) {
    throw error;  
  }
};


const getSectionsClasse = async () => {
  return await sectionClasse.find();
};

const updateSectionClasse = async (id, updateData) => {
  return await sectionClasse.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSectionClasse = async (id) => {
  return await sectionClasse.findByIdAndDelete(id);
};

const getSectionClasseById = async (id) => {
  return await sectionClasse.findById(id);
};


module.exports = {
    createSectionClasse,
    getSectionsClasse,
    updateSectionClasse,
    deleteSectionClasse,
    getSectionClasseById,

};