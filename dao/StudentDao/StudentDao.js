const etudiantModel = require("../../models/EtudiantsModel/EtudiantsModel")

const createEudiant = async (etudiant) => {
  return await etudiantModel.create(etudiant);
};

const getEtudiants = async () => {
  return await etudiantModel.find()
    .populate('etat_compte')
    .populate('type_inscription').
    populate("groupe_classe");
};






module.exports = {
 
    createEudiant,
    getEtudiants
};