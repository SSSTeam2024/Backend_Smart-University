const enseignantModel = require("../../models/EnseignantModel/EnseignantModel")
const PapierAdministratif =require("../../models/PapierAdministratif/PapierAdministratif")
const mongoose = require('mongoose');

const createEnseignant = async (enseignant) => {
  return await enseignantModel.create(enseignant);
};

const getEnseignants = async () => {
  return await enseignantModel.find()
    .populate('etat_compte')
    .populate('specilaite').
    populate("grade")
    .populate('poste')
    .populate("departements").
    populate("papers");
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

// DAO: Handle multiple papier_administratif IDs from different parent documents
// const assignPapierToTeacher = async (enseignantId, papierIds) => {
//   try {
//     const enseignant = await enseignantModel.findById(enseignantId);
//     if (!enseignant) {
//       throw new Error('Teacher not found');
//     }

//     console.log('Teacher found:', enseignant);

//     // Query PapierAdministratif documents based on the given papierIds
//     const papierAdministratifs = await PapierAdministratif.find({
//       _id: { $in: papierIds }
//     });

//     if (!papierAdministratifs.length) {
//       throw new Error('No Papier Administratif documents found');
//     }

//     console.log('PapierAdministratifs found:', papierAdministratifs);

//     // Create a set to hold unique file IDs to avoid duplicates
//     const uniqueFileIds = new Set();

//     // Iterate over the found PapierAdministratif documents and add their _id
//     papierAdministratifs.forEach(papier => {
//       uniqueFileIds.add(papier._id);
//     });

//     // Convert the set to an array
//     const uniqueFileIdArray = Array.from(uniqueFileIds);

//     // Add unique sub-document IDs to the teacher's files_papier_administratif
//     uniqueFileIdArray.forEach(fileId => {
//       if (!enseignant.files_papier_administratif.includes(fileId)) {
//         enseignant.files_papier_administratif.push(fileId);
//       }
//     });

//     // Save the updated teacher
//     await enseignant.save();

//     return enseignant.populate('files_papier_administratif');
//   } catch (error) {
//     throw new Error('Error while assigning Papier Administratif to Teacher: ' + error.message);
//   }
// };

// const assignPapierToTeacher = async (enseignantId, papierIds) => {
//   try {
//     const enseignant = await enseignantModel.findById(enseignantId);
//     if (!enseignant) {
//       throw new Error('Teacher not found');
//     }

//     // Retrieve the PapierAdministratif documents based on the given IDs
//     const papierAdministratifs = await PapierAdministratif.find({ _id: { $in: papierIds } });
//     if (papierAdministratifs.length === 0) {
//       throw new Error('No Papier Administratif documents found');
//     }

//     // Create a set to track unique file IDs
//     const uniqueFileIds = new Set(papierAdministratifs.map(papier => papier._id));

//     // Add unique IDs to the teacher's files_papier_administratif array
//     uniqueFileIds.forEach(fileId => {
//       if (!enseignant.files_papier_administratif.includes(fileId)) {
//         enseignant.files_papier_administratif.push(fileId);
//       }
//     });

//     // Save the updated teacher document
//     await enseignant.save();

//     // Return the enseignant document populated with the associated papier_administratif files
//     return enseignant.populate('files_papier_administratif');
//   } catch (error) {
//     throw new Error('Error while assigning Papier Administratif to Teacher: ' + error.message);
//   }
// };

const assignPapierToTeacher = async (paperData, teacherId) => {
  try {
    if (!teacherId || !Array.isArray(paperData) || paperData.length === 0) {
      throw new Error("Invalid input: Teacher ID or paper data");
    }

    const paperIds = paperData.map(paper => {
      if (!paper.papier_administratif) {
        throw new Error("Invalid papier_administratif ID");
      }
      return mongoose.Types.ObjectId(paper.papier_administratif);
    });

    const papiers = await PapierAdministratif.find({
      '_id': { $in: paperIds }
    });

    if (papiers.length === 0) {
      throw new Error("No Papier Administratif documents found for the provided IDs");
    }

    const updatedTeacher = await enseignantModel.findByIdAndUpdate(
      teacherId,
      { $addToSet: { papers: { $each: paperData } } },
      { new: true }
    ).populate("papers.files_papier_administratif");

    return updatedTeacher;
  } catch (error) {
    throw new Error(`DAO Error: ${error.message}`);
  }
};











module.exports = {
 
    createEnseignant,
    getEnseignants,
    updateEnseignant,
    deleteEnseignant,
    getEnseignantById,
    assignPapierToTeacher
};