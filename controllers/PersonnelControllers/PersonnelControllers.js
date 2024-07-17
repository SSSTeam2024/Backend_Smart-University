const personnelService = require("../../services/PersonnelServices/PersonnelServices");
const Personnel = require("../../models/PersonnelModel/PersonnelModel");
const globalFunctions = require("../../utils/globalFunctions");
const path = require('path');
const addPersonnel = async (req, res) => {
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
      categorie,
      service,
      date_designation,
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
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String
    } = req.body;
    const PhotoProfilPath = "files/personnelFiles/PhotoProfil/";
    const PhotoProfilFilePath = path.join(PhotoProfilPath, globalFunctions.generateUniqueFilename(PhotoProfilFileExtension, "photo_profil"));

    let documents = [
      {
        base64String: PhotoProfilFileBase64String,
        extension: PhotoProfilFileExtension,
        name: path.basename(PhotoProfilFilePath),
        path: PhotoProfilPath,
      }
    ];
    const personnel = await personnelService.registerPersonnelDao({
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
      date_designation,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      categorie,
      service,
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
      photo_profil: path.basename(PhotoProfilFilePath)
    },documents);

    const populatedPersonnel = await Personnel.findById(personnel._id)
      .populate("etat_compte")
      .populate("categorie")
      .populate("grade")
      .populate("poste")
      .populate("service");

    res.json(populatedPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getPersonnels = async (req, res) => {
  try {
    const personnels = await personnelService.getPersonnelsDao();
    res.json(personnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updatePersonnelById = async (req, res) => {
  try {
    const personnelId = req.params.id;
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
      date_designation,
      poste,
      grade,
      departements,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      categorie,
      service,

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
    } = req.body;

    const updatedPersonnel = await personnelService.updatePersonnelDao(
      personnelId,
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
        departements,
        date_designation,
        specilaite,
        date_affectation,
        compte_courant,
        identifinat_unique,
        num_cin,
        date_delivrance,
        categorie,
        service,

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
      }
    );

    if (!updatedPersonnel) {
      return res.status(404).send("Personnel not found!");
    }
    res.json(updatedPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPersonnelById = async (req, res) => {
  try {
    const personnelId = req.params.id;

    const getPersonnel = await personnelService.getPersonnelDaoById(
      personnelId
    );

    if (!getPersonnel) {
      return res.status(404).send("Personnel not found");
    }
    res.json(getPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePersonnelById = async (req, res) => {
  try {
    const personnelId = req.params.id;

    const deletedPersonnel = await personnelService.deletePersonnelDao(
      personnelId
    );

    if (!deletedPersonnel) {
      return res.status(404).send("Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addPersonnel,
  getPersonnels,
  getPersonnelById,
  updatePersonnelById,
  deletePersonnelById,
};
