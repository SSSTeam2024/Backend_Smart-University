const sectionClasseDao = require("../../dao/SectionClasseDao/SectionClasseDao");

const registerSectionClasse = async (userData) => {
 
  return await sectionClasseDao.createSectionClasse(userData);
};

const updateSetionClasseDao = async (id, updateData) => {
  return await sectionClasseDao.updateSectionClasse(id, updateData);
};

const getSectionClasseDaoById = async (id) => {
  return await sectionClasseDao.getSectionClasseById(id)
};

const getSectionsClasseDao = async () => {
  const result = await sectionClasseDao.getSectionsClasse();
  return result;
};

const deleteSectionClassetDao = async (id) => {
  return await sectionClasseDao.deleteSectionClasse(id)
};



module.exports = {
    deleteSectionClassetDao,
    getSectionsClasseDao,
    getSectionClasseDaoById,
    updateSetionClasseDao,
    registerSectionClasse,

};