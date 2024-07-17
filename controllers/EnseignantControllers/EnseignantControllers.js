const enseignantService = require("../../services/EnseignantServices/EnseignantServices");
const Enseignant = require("../../models/EnseignantModel/EnseignantModel");
const globalFunctions = require("../../utils/globalFunctions");
const path = require('path');

const addEnseignant = async (req, res) => {
  try {
    const {
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      poste,
      grade,
      departements,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,
      entreprise1,
      annee_certif1,
      certif1,
      entreprise2,
      annee_certif2,
      certif2,
      entreprise3,
      annee_certif3,
      certif3,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String
    } = req.body;

    const PhotoProfilPath = "files/enseignantFiles/PhotoProfil/";
    const PhotoProfilFilePath = path.join(PhotoProfilPath, globalFunctions.generateUniqueFilename(PhotoProfilFileExtension, "photo_profil"));

    let documents = [
      {
        base64String: PhotoProfilFileBase64String,
        extension: PhotoProfilFileExtension,
        name: path.basename(PhotoProfilFilePath),
        path: PhotoProfilPath,
      }
    ];

    const enseignant = await enseignantService.registerEnseignantDao({
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      poste,
      grade,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      state,
      dependence,
      code_postale,
      departements,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,
      entreprise1,
      annee_certif1,
      certif1,
      entreprise2,
      annee_certif2,
      certif2,
      entreprise3,
      annee_certif3,
      certif3,
      photo_profil: path.basename(PhotoProfilFilePath)
    }, documents);

    const populatedEnseignant = await Enseignant.findById(enseignant._id)
      .populate("etat_compte")
      .populate("poste")
      .populate("grade")
      .populate("specilaite")
      .populate("departements");

    res.json(populatedEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


const getEnseignants = async (req, res) => {
  try {
    const enseignants = await enseignantService.getEnseignatsDao();
    res.json(enseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateEnseignantById = async (req, res) => {
  try {
    const enseignantId = req.params.id;
    const {
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      poste,
      grade,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,

      state,
      dependence,
      code_postale,
      departements,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,

      entreprise1,
      annee_certif1,
      certif1,

      entreprise2,
      annee_certif2,
      certif2,
    } = req.body;

    const updatedEnseignant = await enseignantService.updateEnseignantDao(
      enseignantId,
      {
        nom_fr,
        nom_ar,
        prenom_fr,
        prenom_ar,
        lieu_naissance_fr,
        lieu_naissance_ar,
        date_naissance,
        nationalite,
        etat_civil,
        sexe,
        etat_compte,
        poste,
        grade,
        specilaite,
        date_affectation,
        compte_courant,
        identifinat_unique,
        num_cin,
        date_delivrance,

        state,
        dependence,
        code_postale,
        departements,
        adress_ar,
        adress_fr,
        num_phone1,
        num_phone2,
        email,
        nom_conjoint,
        job_conjoint,
        nombre_fils,

        entreprise1,
        annee_certif1,
        certif1,

        entreprise2,
        annee_certif2,
        certif2,
      }
    );

    if (!updatedEnseignant) {
      return res.status(404).send("Enseignant not found!");
    }
    res.json(updatedEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEnseignantById = async (req, res) => {
  try {
    const enseignantId = req.params.id;

    const getEnseignant = await enseignantService.getEnseignantDaoById(
      enseignantId
    );

    if (!getEnseignant) {
      return res.status(404).send("Enseignant not found");
    }
    res.json(getEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEnseignantById = async (req, res) => {
  try {
    const enseignantId = req.params.id;

    const deletedEnseignant = await enseignantService.deleteEnseignantDao(
      enseignantId
    );

    if (!deletedEnseignant) {
      return res.status(404).send("Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addEnseignant,
  getEnseignants,
  deleteEnseignantById,
  getEnseignantById,
  updateEnseignantById,
};
