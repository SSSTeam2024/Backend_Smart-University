const ficheVoeuxService = require("../../services/FicheVoeuxServices/FicheVoeuxService");

const addFicheVoeux = async (req, res) => {
  try {
    const { fiche_voeux_classes, enseignant, semestre } = req.body;

    const fiche = await ficheVoeuxService.createficheVoeux({
      fiche_voeux_classes, enseignant, semestre
    });
    res.json(fiche);
  } catch (error) {
    console.error(error);
  }
};

const updateSalleById = async (req, res) => {
  try {
    const salleId = req.params.id;
    const { salle, emplacement, type_salle, departement } = req.body;

    const updatedSalle= await salleService.updateSalle(salleId, {
        salle, emplacement, type_salle, departement
    });

    if (!updatedSalle) {
      return res.status(404).send("Salle not found!");
    }
    res.json(updatedSalle);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSalleById = async (req, res) => {
  try {
    const salleId = req.params.id;

    const getSalle= await salleService.getSalleById(salleId);

    if (!getSalle) {
      return res.status(404).send("Salle not found");
    }
    res.json(getSalle);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getFichesVoeux = async (req, res) => {
  try {
    const fichesVoeux = await ficheVoeuxService.getFichesVoeux();
    res.json(fichesVoeux);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteFicheVoeuxById = async (req, res) => {
  try {
    const ficheVoeuxId = req.params.id;

    const deletedFicheVoeux = await ficheVoeuxService.deleteFicheVoeuxById(ficheVoeuxId);

    if (!deletedFicheVoeux) {
      return res.status(404).send("Fiche Voeux not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
// 

module.exports = {
  addFicheVoeux,
  getFichesVoeux,
  deleteFicheVoeuxById
};
