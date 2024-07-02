const niveauClasse = require("../../models/NiveauClasseModel/NiveauClasseModel");

const createNiveauClasse= async (niveau) => {
  try {
    return await niveauClasse.create(niveau);
  } catch (error) {
    throw error;  
  }
};


const getNiveauxClasse = async () => {
  return await niveauClasse.find();
};

const updateNiveauClasse = async (id, updateData) => {
  return await niveauClasse.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNiveauClasse = async (id) => {
  return await niveauClasse.findByIdAndDelete(id);
};

const getNiveauClasseById = async (id) => {
  return await niveauClasse.findById(id);
};


module.exports = {
    createNiveauClasse,
    getNiveauxClasse,
    updateNiveauClasse,
    deleteNiveauClasse,
    getNiveauClasseById,

};