const niveauClasse = require("../../models/NiveauClasseModel/NiveauClasseModel");

const createNiveauClasse= async (niveau) => {
  try {
    return await niveauClasse.create(niveau);
  } catch (error) {
    throw error;  
  }
};


const getNiveauxClasse = async () => {
  return await niveauClasse.find().populate("sections");
};

const updateNiveauClasse = async (id, updateData) => {
  return await niveauClasse.findByIdAndUpdate(id, updateData, { new: true }).populate("sections");
};

const deleteNiveauClasse = async (id) => {
  return await niveauClasse.findByIdAndDelete(id);
};

const getNiveauClasseById = async (id) => {
  return await niveauClasse.findById(id).populate("sections");
};

// getSectionsByIdNiveau

async function getSectionsByIdNiveau(niveauClasseId) {
  try {
    return await niveauClasse.findById(niveauClasseId).populate(
      "sections"
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
    createNiveauClasse,
    getNiveauxClasse,
    updateNiveauClasse,
    deleteNiveauClasse,
    getNiveauClasseById,
    getSectionsByIdNiveau

};