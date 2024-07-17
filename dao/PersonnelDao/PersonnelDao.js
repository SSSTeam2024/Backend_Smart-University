const personnelModel = require("../../models/PersonnelModel/PersonnelModel");

const createPersonnel = async (personnel) => {
  return await personnelModel.create(personnel);
};

const getPersonnels = async () => {
  return await personnelModel
    .find()
    .populate("etat_compte")
    .populate("categorie")
    .populate("grade")
    .populate("poste")
    .populate("service");
};

const updatePersonnel = async (id, updateData) => {
  return await personnelModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePersonnel = async (id) => {
  return await personnelModel.findByIdAndDelete(id);
};

const getPersonnelById = async (id) => {
  return await personnelModel
    .findById(id)
    .populate("etat_compte")
    .populate("categorie")
    .populate("grade")
    .populate("poste")
    .populate("service");
};

module.exports = {
  createPersonnel,
  getPersonnels,
  updatePersonnel,
  getPersonnelById,
  deletePersonnel

};
