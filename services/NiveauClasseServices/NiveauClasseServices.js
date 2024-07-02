const niveauClasseDao = require("../../dao/NiveauClasseDao/NiveauClasseDao");

const registerNiveauClasse = async (userData) => {
 
  return await niveauClasseDao.createNiveauClasse(userData);
};

const updateNiveauClasseDao = async (id, updateData) => {
  return await niveauClasseDao.updateNiveauClasse(id, updateData);
};

const getNiveauClasseDaoById = async (id) => {
  return await niveauClasseDao.getNiveauClasseById(id)
};

const getNiveauxClasseDao = async () => {
  const result = await niveauClasseDao.getNiveauxClasse();
  return result;
};

const deleteNiveauClassetDao = async (id) => {
  return await niveauClasseDao.deleteNiveauClasse(id)
};



module.exports = {
    deleteNiveauClassetDao,
    getNiveauxClasseDao,
    getNiveauClasseDaoById,
    registerNiveauClasse,
    updateNiveauClasseDao,

};