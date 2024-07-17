const enseignantModel = require("../../models/EnseignantModel/EnseignantModel")

const createEnseignant = async (enseignant) => {
  return await enseignantModel.create(enseignant);
};

const getEnseignants = async () => {
  return await enseignantModel.find()
    .populate('etat_compte')
    .populate('specilaite').
    populate("grade")
    .populate('poste')
    .populate("departements");
};


const updateEnseignant = async (id, updateData) => {
  return await enseignantModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEnseignant = async (id) => {
  return await enseignantModel.findByIdAndDelete(id);
};

const getEnseignantById = async (id) => {
  return await enseignantModel
  .populate('specilaite').
  populate("grade")
  .populate('poste')
  .populate("departements");
};



module.exports = {
 
    createEnseignant,
    getEnseignants,
    updateEnseignant,
    deleteEnseignant,
    getEnseignantById
};