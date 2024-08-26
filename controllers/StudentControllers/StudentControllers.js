const studentService = require("../../services/EtudiantServices/EtudiantServices");
const globalFunctions = require("../../utils/globalFunctions");
const Etudiant = require("../../models/EtudiantsModel/EtudiantsModel");
const fs = require("fs");
const path = require("path");
const TypeInscriptionEtudiant = require("../../models/TypeInscriptionEtudiantModel/TypeInscriptionEtudiantModel");

const addStudent = async (req, res) => {
  try {
    const {
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_ar,
      lieu_naissance_fr,
      date_naissance,
      nationalite,
      sexe,
      etat_civil,
      num_CIN,
      Face1CINFileBase64String,
      Face1CINFileExtension,
      Face2CINFileBase64String,
      Face2CINFileExtension,
      FichePaiementFileBase64String,
      FichePaiementFileExtension,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone,
      email,
      nom_pere,
      job_pere,
      nom_mere,
      num_phone_tuteur,
      moyen,
      session,
      filiere,
      niveau_scolaire,
      annee_scolaire,
      type_inscription,
      etat_compte,
      groupe_classe,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
      files,
    } = req.body;

    const face1CINPath = "files/etudiantFiles/Face1CIN/";
    const face2CINPath = "files/etudiantFiles/Face2CIN/";
    const fichePaiementPath = "files/etudiantFiles/FichePaiement/";
    const PhotoProfilPath = "files/etudiantFiles/PhotoProfil/";

    let face_1_CIN = globalFunctions.generateUniqueFilename(
      Face1CINFileExtension,
      "face_1_CIN"
    );

    let face_2_CIN = globalFunctions.generateUniqueFilename(
      Face2CINFileExtension,
      "face_2_CIN"
    );

    let fiche_paiement = globalFunctions.generateUniqueFilename(
      FichePaiementFileExtension,
      "fiche_paiement"
    );

    let photo_profil = globalFunctions.generateUniqueFilename(
      PhotoProfilFileExtension,
      "photo_profil"
    );

    const typeInscription = await TypeInscriptionEtudiant.findById(
      type_inscription
    );
    if (!typeInscription) {
      return res.status(404).json({ error: "Type inscription not found" });
    }

    const filesTypeInscription = typeInscription.files_type_inscription;

    let documents = [
      {
        base64String: Face1CINFileBase64String,
        extension: Face1CINFileExtension,
        name: face_1_CIN,
        path: face1CINPath,
      },
      {
        base64String: Face2CINFileBase64String,
        extension: Face2CINFileExtension,
        name: face_2_CIN,
        path: face2CINPath,
      },
      {
        base64String: FichePaiementFileBase64String,
        extension: FichePaiementFileExtension,
        name: fiche_paiement,
        path: fichePaiementPath,
      },
      {
        base64String: PhotoProfilFileBase64String,
        extension: PhotoProfilFileExtension,
        name: photo_profil,
        path: PhotoProfilPath,
      },
    ];

    for (let i = 0; i < files.length; i++) {
      const fileTypeNameFr = files[i].name_fr;
      const base64String = files[i].base64String;
      const fileExtension = files[i].extension;
      if (!base64String || !fileExtension) {
        return res.status(400).json({
          error: `Base64 string or extension is undefined for file type: ${fileTypeNameFr}`,
        });
      }

      const filePath = `files/etudiantFiles/Additional/${fileTypeNameFr}/`;
      let fileFullPath = globalFunctions.generateUniqueFilename(
        fileExtension,
        fileTypeNameFr
      );

      documents.push({
        base64String,
        extension: fileExtension,
        name: fileFullPath,
        path: filePath,
      });
    }

    const etudiant = await studentService.registerEtudiant(
      {
        nom_fr,
        nom_ar,
        prenom_fr,
        prenom_ar,
        lieu_naissance_ar,
        lieu_naissance_fr,
        date_naissance,
        nationalite,
        sexe,
        etat_civil,
        num_CIN,
        state,
        dependence,
        code_postale,
        adress_ar,
        adress_fr,
        num_phone,
        email,
        nom_pere,
        job_pere,
        nom_mere,
        num_phone_tuteur,
        moyen,
        session,
        filiere,
        niveau_scolaire,
        annee_scolaire,
        type_inscription,
        etat_compte,
        groupe_classe,
        face_1_CIN,
        face_2_CIN,
        fiche_paiement,
        photo_profil,
        files: documents.map((doc) => doc.name),
      },
      documents
    );

    res.json(etudiant);
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

const deleteEtudiant = async (req, res) => {
  try {
    const etudiantId = req.params.id;

    const deletedEtudiant = await studentService.deleteEtudiant(
      etudiantId
    );

    if (!deletedEtudiant) {
      return res.status(404).send("Etudiant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const etudiantId = req.params.id;
    const {
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_ar,
      lieu_naissance_fr,
      date_naissance,
      nationalite,
      sexe,
      etat_civil,
      num_CIN,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone,
      email,
      nom_pere,
      job_pere,
      nom_mere,
      num_phone_tuteur,
      moyen,
      session,
      filiere,
      niveau_scolaire,
      annee_scolaire,
      type_inscription,
      etat_compte,
      groupe_classe,
      face_1_CIN,
      face_2_CIN,
      fiche_paiement,
      photo_profil,
    } = req.body;

    const updatedEtudiant = await studentService.updateEtudiant(
      etudiantId,
      {
        nom_fr,
        nom_ar,
        prenom_fr,
        prenom_ar,
        lieu_naissance_ar,
        lieu_naissance_fr,
        date_naissance,
        nationalite,
        sexe,
        etat_civil,
        num_CIN,
        state,
        dependence,
        code_postale,
        adress_ar,
        adress_fr,
        num_phone,
        email,
        nom_pere,
        job_pere,
        nom_mere,
        num_phone_tuteur,
        moyen,
        session,
        filiere,
        niveau_scolaire,
        annee_scolaire,
        type_inscription,
        etat_compte,
        groupe_classe,
        face_1_CIN,
        face_2_CIN,
        fiche_paiement,
        photo_profil,
      }
    );

    if (!updatedEtudiant) {
      return res.status(404).send("Etudiant not found!");
    }
    res.json(updatedEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};



module.exports = {
  addStudent,
  getAllStudents,
  deleteEtudiant,
  updateStudent
};
