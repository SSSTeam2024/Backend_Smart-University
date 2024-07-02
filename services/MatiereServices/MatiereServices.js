const matiereDao = require("../../dao/MatiereDao/MatiereDao");
const Classe =require("../../models/ClasseModels/ClasseModels")

const registerMatiere = async (userData) => {
 
  return await matiereDao.createMatiere(userData);
};

const updateMatiereDao = async (id, updateData) => {
  return await matiereDao.updateMatiere(id, updateData);
};

const getMatiereDaoById = async (id) => {
  return await matiereDao.getMatiereById(id)
};

const getMatieresDao = async () => {
  const result = await matiereDao.getMatieres();
  return result;
};

const deleteMatiereDao = async (id) => {
  try {
    console.log(`Attempting to delete matiere with ID: ${id}`);
    const deletedMatiere = await matiereDao.deleteMatiere(id);

    if (!deletedMatiere) {
      console.log(`Matiere with ID ${id} not found`);
      throw new Error("Matiere not found");
    }

    console.log(`Matiere with ID ${id} deleted successfully`);
    const updateResult = await Classe.updateMany(
      { matieres: id },
      { $pull: { matieres: id } }
    );

    console.log("Update result:", updateResult);
    if (updateResult.modifiedCount === 0) {
      console.warn(`No classes were updated to remove the deleted matiere ID ${id}`);
    }

    return deletedMatiere;
  } catch (error) {
    console.error("Error deleting matiere and updating classes:", error);
    throw error;
  }
};




module.exports = {
    deleteMatiereDao,
    getMatieresDao,
    getMatiereDaoById,
    updateMatiereDao,
    registerMatiere,

};