const dossierAdministratifService = require("../../services/DossierAdministratifServices/DossierAdministratifServices");
const enseignantService = require("../../services/EnseignantServices/EnseignantServices");
const globalFunctions = require("../../utils/globalFunctions");
const PapierAdministratifModel = require("../../models/PapierAdministratif/PapierAdministratif");
const DossierAdministratifModel = require("../../models/DossierAdministratifModel/DossierAdministratifModel");
const personnelDao = require("../../dao/PersonnelDao/PersonnelDao");

const addDossierAdministratif = async (req, res) => {
  try {
    const { enseignant, personnel, papers } = req.body;

    const filePath = "files/dossierFiles/";
    const documents = [];
    const papersToSave = [];
    if (!enseignant && !personnel) {
      return res.status(400).json({
        message: "At least one of enseignant or personnel must be provided.",
      });
    }

    for (const paper of papers) {
      let paperId;
      if (!paper.papier_administratif) {
        const newPapier = new PapierAdministratifModel({
          nom_ar: paper.nom_ar,
          nom_fr: paper.nom_fr,
          category: paper.category || [],
        });
        const savedPapier = await newPapier.save();
        paperId = savedPapier._id;
        console.log(
          `Created new papier_administratif with ID: ${savedPapier._id}`
        );
      } else {
        paperId = paper.papier_administratif;
      }
      let file = globalFunctions.generateUniqueFilename(
        paper.FileExtension,
        "file"
      );
      let document = {
        base64String: paper.FileBase64String,
        extension: paper.FileExtension,
        name: file,
        path: filePath,
      };
      documents.push(document);
      papersToSave.push({
        papier_administratif: paperId,
        annee: paper.annee,
        remarques: paper.remarques,
        file: file,
      });
    }
    const existingDossierEnseignant = enseignant
      ? await DossierAdministratifModel.findOne({ enseignant })
      : null;
    const existingDossierPersonnel = personnel
      ? await DossierAdministratifModel.findOne({ personnel })
      : null;

    let dossierAdministratif;
    if (existingDossierEnseignant) {
      existingDossierEnseignant.papers.push(...papersToSave);
      dossierAdministratif = await existingDossierEnseignant.save();
      console.log("Updated Dossier Enseignant:", dossierAdministratif);
    } else if (existingDossierPersonnel) {
      existingDossierPersonnel.papers.push(...papersToSave);
      dossierAdministratif = await existingDossierPersonnel.save();
      console.log("Updated Dossier Personnel:", dossierAdministratif);
    } else {
      const dossierData = {
        enseignant: enseignant || undefined,
        personnel: personnel || undefined,
        papers: papersToSave,
      };
      dossierAdministratif =
        await dossierAdministratifService.addDossierAdministratif(
          dossierData,
          documents
        );
      console.log("Created New Dossier:", dossierAdministratif);
    }
    const papierIds = papersToSave.map((paper) => paper.papier_administratif);

    if (enseignant) {
      await enseignantService.assignPapierToTeacher(enseignant, papierIds);
    }

    if (personnel) {
      await personnelDao.assignPapierToPersonnel(personnel, papierIds);
    }

    res.status(201).json(dossierAdministratif);
  } catch (error) {
    console.error("Error saving DossierAdministratif:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllDossierAdmnistratifs = async (req, res) => {
  try {
    const dossierAdministratif =
      await dossierAdministratifService.getDossierAdministratifsDao();
    res.json(dossierAdministratif);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const removePaperFromDossier = async (req, res) => {
  try {
    const { dossierId, papierId, entityId, entityType } = req.params;

    // Validate entityType (either 'personnel' or 'enseignant')
    if (!["personnel", "enseignant"].includes(entityType)) {
      return res.status(400).json({ message: "Invalid entity type" });
    }

    // Call the service to remove the paper from the dossier and entity
    const updatedDossier =
      await dossierAdministratifService.removePaperFromDossier(
        dossierId,
        papierId,
        entityId,
        entityType
      );

    res
      .status(200)
      .json({ message: "Paper removed successfully", dossier: updatedDossier });
  } catch (error) {
    console.error(
      "Error in removePaperFromDossierAndEntity controller:",
      error
    );
    res.status(500).json({ message: error.message });
  }
};

// const updateDossierAdministratif = async (req, res) => {
//   try {

//     const DossierAdministratifId = req.body.dossierId;
//     const { enseignant, personnel, papers } = req.body;

//     const DossierFilesPath = "files/dossierFiles/";
//     let documents = [];
//     let updatedPapers = papers.map((paper) => {
//       let { FileBase64String, FileExtension, file, ...restOfPaper } = paper;
//       if (FileBase64String && FileExtension) {
//         let file = globalFunctions.generateUniqueFilename(
//           FileExtension,
//           "Dossier"
//         );
//         documents.push({
//           base64String: FileBase64String,
//           extension: FileExtension,
//           name: file,
//           path: DossierFilesPath,
//         });
//         restOfPaper.file = file;
//       }
//       return restOfPaper;
//     });
//     let dossierBody = {
//       enseignant,
//       personnel,
//       papers: updatedPapers,
//     };
//     console.log(documents);
//     const dossier =
//       await dossierAdministratifService.updateDossierAdministratif(
//         DossierAdministratifId,
//         dossierBody,
//         documents
//       );
//     res.status(200).json(dossier);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };
const updateDossierAdministratif = async (req, res) => {
  try {
    const DossierAdministratifId = req.body.dossierId;
    const { enseignant, personnel, papers } = req.body;

    const DossierFilesPath = "files/dossierFiles/";
    let documents = [];
    let updatedPapers = papers.map((paper) => {
      let { FileBase64String, FileExtension, file, ...restOfPaper } = paper;

      if (FileBase64String && FileExtension) {
        // New file provided, update and save
        let newFile = globalFunctions.generateUniqueFilename(FileExtension, "Dossier");
        documents.push({
          base64String: FileBase64String,
          extension: FileExtension,
          name: newFile,
          path: DossierFilesPath,
        });
        restOfPaper.file = newFile;
      } else {
        // No new file, retain the old one
        restOfPaper.file = file; // Keep the old file if no new file provided
      }
      return restOfPaper;
    });

    let dossierBody = {
      enseignant,
      personnel,
      papers: updatedPapers,
    };

    const dossier = await dossierAdministratifService.updateDossierAdministratif(
      DossierAdministratifId,
      dossierBody,
      documents
    );

    res.status(200).json(dossier);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addDossierAdministratif,
  getAllDossierAdmnistratifs,
  removePaperFromDossier,
  updateDossierAdministratif,
};
