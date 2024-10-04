const DossierAdministratif = require("../../models/DossierAdministratifModel/DossierAdministratifModel");
const EnseignantModel = require("../../models/EnseignantModel/EnseignantModel");
const PersonnelModel = require("../../models/PersonnelModel/PersonnelModel");
const addDossierAdministratif = async (dossierData) => {
  try {
    return await DossierAdministratif.create(dossierData);
  } catch (error) {
    console.error("Error creating dossier:", error);
    throw error;
  }
};

const getDossiersAdministratifs = async () => {
  try {
    return await DossierAdministratif.find()
      .populate("enseignant")
      .populate("personnel")
      .populate({
        path: "papers.papier_administratif",
        model: "PapierAdministratif",
      })
      .exec();
  } catch (error) {
    console.error("Error fetching dossiers:", error);
    throw error;
  }
};

const updateDossiersAdministratif = async (id, updateData) => {
  try {
    return await DossierAdministratif.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("enseignant")
      .populate("personnel")
      .populate({
        path: "papers.papier_administratif",
        model: "PapierAdministratif",
      });
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};


const removeSpecificPaperFromDossier= async (dossierId, userId, userType, paperDetails) =>{
  const query = {
      _id: dossierId,
      [userType]: userId, // userType will be either 'enseignant' or 'personnel'
  };

  const update = {
      $pull: {
          papers: {
              papier_administratif: paperDetails.papier_administratif,  // Filter by paper ID
              annee: paperDetails.annee,                               // Filter by year
              remarques: paperDetails.remarques,                       // Filter by remarks
              file: paperDetails.file                                  // Filter by file
          }
      }
  };

  return await DossierAdministratif.findOneAndUpdate(query, update, { new: true });
}

module.exports = {
  addDossierAdministratif,
  getDossiersAdministratifs,
  removeSpecificPaperFromDossier,
  updateDossiersAdministratif,
};
