const NiveauClasseModel = require("../../models/NiveauClasseModel/NiveauClasseModel");
const sectionClasse = require("../../models/SectionClasseModel/SectionClasseModel");

const createSectionClasse = async (section) => {
  try {
    return await sectionClasse.create(section);
  } catch (error) {
    throw error;
  }
};

const getSectionsClasse = async () => {
  try {
    return await sectionClasse.find().populate("niveau_classe").populate("departements");
  } catch (error) {
    console.error("Error fetching niveaux classe:", error);
    throw error;
  }
};
const updateSectionClasse = async (id, updateData) => {
  try {
    return await sectionClasse
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("niveau_classe").populate("departements");;
  } catch (error) {
    console.error("Error updating niveau classe:", error);
    throw error;
  }
};

const deleteSectionClasse = async (id) => {
  return await sectionClasse.findByIdAndDelete(id);
};

const getSectionClasseById = async (id) => {
  try {
    return await sectionClasse.findById(id).populate("niveau_classe").populate("departements");;
  } catch (error) {
    console.error("Error fetching niveau classe by ID:", error);
    throw error;
  }
};


module.exports = {
  createSectionClasse,
  getSectionsClasse,
  updateSectionClasse,
  deleteSectionClasse,
  getSectionClasseById,

};
