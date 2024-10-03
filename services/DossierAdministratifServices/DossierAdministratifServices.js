const dossierAdministratifDao = require("../../dao/DossierAdministratifDao/DossierAdministratifDao");
const fs = require("fs");
const path = require('path');

const addDossierAdministratif = async ( dossierData, documents) => {
  try {
    let saveResult = await saveDocumentToServer(documents);
    console.log("Save result:", saveResult);
    if (saveResult) {
      const newDossier = await dossierAdministratifDao.addDossierAdministratif(dossierData);
      return newDossier;
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function saveDocumentToServer(documents) {
  try {
    let counter = 0;
    for (const file of documents) {
   
      await saveAdministrativeFile(file.base64String, file.name, file.path);
      counter++;
      console.log("File number " + counter + " saved");
    }
    return counter === documents.length;
  } catch (error) {
    console.error("Error saving documents:", error);
    return false;
  }
}
async function saveAdministrativeFile(base64String, fileName, filePath) {
  return new Promise((resolve, reject) => {
    const binaryData = Buffer.from(base64String, "base64");
    const fullFilePath = path.join(filePath, fileName);
    fs.mkdirSync(filePath, { recursive: true });

    fs.writeFile(fullFilePath, binaryData, "binary", (err) => {
      if (err) {
        console.error("Error saving the file:", err);
        reject(err);
      } else {
        console.log("File saved successfully!");
        resolve();
      }
    });
  });
}



// const updateDossierAdministratif = async (id,updateData, documents) => {
//   try {
//     let saveResult = await saveDocumentToServer(documents);
    
//     if (saveResult) {
//       const updatedDossierAdministratif = await dossierAdministratifDao.updateDossiersAdministratif(id,updateData);
//       return updatedDossierAdministratif;
//     } else {
//       throw new Error('Failed to save documents.');
//     }
//   } catch (error) {
//     console.error("Error updating Dossier Administratif:", error);
//     throw error;
//   }
// };

const updateDossierAdministratif = async (id, updateData, documents) => {
  try {
    // Save only new documents that are provided
    let saveResult = documents.length > 0 ? await saveDocumentToServer(documents) : true;

    if (saveResult) {
      // Proceed with updating the Dossier if document save is successful or no documents were uploaded
      const updatedDossierAdministratif = await dossierAdministratifDao.updateDossiersAdministratif(id, updateData);
      return updatedDossierAdministratif;
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error("Error updating Dossier Administratif:", error);
    throw error;
  }
};

const removePaperFromDossier = async (dossierId, papierId, entityId, entityType) => {
  try {
    // Call DAO to remove the paper from the dossier and entity (personnel/enseignant)
    const updatedDossier = await dossierAdministratifDao.removePaperFromDossier(dossierId, papierId, entityId, entityType);
    return updatedDossier;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};
const getDossierAdministratifsDao = async () => {
  try {
    return await dossierAdministratifDao.getDossiersAdministratifs();
  } catch (error) {
    console.error("Error fetching dossiers:", error);
    throw error;
  }
};
module.exports = {
  addDossierAdministratif,
  getDossierAdministratifsDao,
  removePaperFromDossier,
  updateDossierAdministratif
};
