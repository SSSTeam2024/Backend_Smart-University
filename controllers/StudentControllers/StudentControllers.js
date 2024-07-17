const studentService = require("../../services/EtudiantServices/EtudiantServices");
const globalFunctions = require("../../utils/globalFunctions");
const Etudiant = require ("../../models/EtudiantsModel/EtudiantsModel")
const fs = require('fs');
const path = require('path');
const TypeInscriptionEtudiant = require ("../../models/TypeInscriptionEtudiantModel/TypeInscriptionEtudiantModel")

const addStudent = async (req, res) => {
  try {
    const {
      nom_fr, nom_ar, prenom_fr, prenom_ar, lieu_naissance_ar, lieu_naissance_fr,
      date_naissance, nationalite, sexe, etat_civil, num_CIN, Face1CINFileBase64String,
      Face1CINFileExtension, Face2CINFileBase64String, Face2CINFileExtension,
      FichePaiementFileBase64String, FichePaiementFileExtension, state, dependence,
      code_postale, adress_ar, adress_fr, num_phone, email, nom_pere, job_pere, nom_mere,
      num_phone_tuteur, moyen, session, filiere, niveau_scolaire, annee_scolaire,
      type_inscription, etat_compte, groupe_classe, PhotoProfilFileExtension, PhotoProfilFileBase64String
    } = req.body;

    const face1CINPath = "files/etudiantFiles/Face1CIN/";
    const face1CINFilePath = path.join(face1CINPath, globalFunctions.generateUniqueFilename(Face1CINFileExtension, "face_1_CIN"));

    const face2CINPath = "files/etudiantFiles/Face2CIN/";
    const face2CINFilePath = path.join(face2CINPath, globalFunctions.generateUniqueFilename(Face2CINFileExtension, "face_2_CIN"));

    const fichePaiementPath = "files/etudiantFiles/FichePaiement/";
    const fichePaiementFilePath = path.join(fichePaiementPath, globalFunctions.generateUniqueFilename(FichePaiementFileExtension, "fiche_paiement"));


    const PhotoProfilPath = "files/etudiantFiles/PhotoProfil/";
    const PhotoProfilFilePath = path.join(PhotoProfilPath, globalFunctions.generateUniqueFilename(PhotoProfilFileExtension, "photo_profil"));


    const typeInscription = await TypeInscriptionEtudiant.findById(type_inscription);
    if (!typeInscription) {
      return res.status(404).json({ error: 'Type inscription not found' });
    }

    const filesTypeInscription = typeInscription.files_type_inscription;

    let documents = [
      {
        base64String: Face1CINFileBase64String,
        extension: Face1CINFileExtension,
        name: face1CINFilePath,
        path: face1CINPath,
      },
      {
        base64String: Face2CINFileBase64String,
        extension: Face2CINFileExtension,
        name: face2CINFilePath,
        path: face2CINPath,
      },
      {
        base64String: FichePaiementFileBase64String,
        extension: FichePaiementFileExtension,
        name: fichePaiementFilePath,
        path: fichePaiementPath,
      },
      {
        base64String: PhotoProfilFileBase64String,
        extension: PhotoProfilFileExtension,
        name: path.basename(PhotoProfilFilePath),
        path: PhotoProfilPath,
      }
    ];

    for (let i = 0; i < filesTypeInscription.length; i++) {
      const fileTypeNameAr = filesTypeInscription[i].name_ar;
      const fileTypeNameFr = filesTypeInscription[i].name_fr;
      const base64String = req.body[`${fileTypeNameFr}FileBase64String`];
      const fileExtension = req.body[`${fileTypeNameFr}FileExtension`];

      if (!base64String || !fileExtension) {
        return res.status(400).json({ error: `Base64 string or extension is undefined for file type: ${fileTypeNameFr}` });
      }

      const filePath = `files/etudiantFiles/Additional/${fileTypeNameFr}/`;
      const fileFullPath = path.join(filePath, globalFunctions.generateUniqueFilename(fileExtension, fileTypeNameFr));

      documents.push({
        base64String,
        extension: fileExtension,
        name: fileFullPath,
        path: filePath,
      });
    }

    const etudiant = await studentService.registerEtudiant({
      nom_fr, nom_ar, prenom_fr, prenom_ar, lieu_naissance_ar, lieu_naissance_fr, date_naissance,
      nationalite, sexe, etat_civil, num_CIN, state, dependence, code_postale, adress_ar, adress_fr,
      num_phone, email, nom_pere, job_pere, nom_mere, num_phone_tuteur, moyen, session, filiere,
      niveau_scolaire, annee_scolaire, type_inscription, etat_compte, groupe_classe,
      face_1_CIN: face1CINFilePath, face_2_CIN: face2CINFilePath, fiche_paiement: fichePaiementFilePath, photo_profil: path.basename(PhotoProfilFilePath),
      files: documents.map(doc => doc.name),
    }, documents);

    const populatedEtudiant = await Etudiant.findById(etudiant._id)
      .populate('etat_compte')
      .populate('type_inscription')
      .populate('groupe_classe');

    res.json(populatedEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};





const getAllStudents = async (req, res) => {
  try {
    const etudiants = await studentService.getEtudiants();
    res.json(etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addStudent,
  getAllStudents,
};
