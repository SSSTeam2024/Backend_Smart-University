const seanceService = require("../../services/SeanceServices/SeanceServices");

const createSeance = async (req, res) => {
  try {
    const {
      jour,
      matiere,
      enseignant,
      classe,
      salle,
      heure_fin,
      heure_debut,
      semestre,
      type_seance,
    } = req.body;
 console.log(req.body);
    const seanceJson = await seanceService.createSeance({
      jour,
      matiere,
      enseignant,
      classe,
      salle,
      heure_fin,
      heure_debut,
      type_seance,
      semestre,
    });
    res.json(seanceJson);
  } catch (error) {
    console.error(error);
  }
};

const updateSeanceById = async (req, res) => {
  try {
    const seanceId = req.params.id;
    const {
      jour,
      matiere,
      enseignant,
      classe,
      salle,
      heure_fin,
      heure_debut,
      semestre,
      type_seance,
    } = req.body;

    const updatedSeance = await seanceService.updateSeance(seanceId, {
      jour,
      matiere,
      enseignant,
      classe,
      salle,
      heure_fin,
      heure_debut,
      semestre,
      type_seance,
    });

    if (!updatedSeance) {
      return res.status(404).send("Seance not found!");
    }
    res.json(updatedSeance);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSeanceById = async (req, res) => {
  try {
    const seanceId = req.params.id;

    const getSeance = await seanceService.getSeanceById(seanceId);

    if (!getSeance) {
      return res.status(404).send("Seance not found");
    }
    res.json(getSeance);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSeancesByIdTeacher = async (req, res) => {
  try {
    const { teacher_id, jour, semestre } = req.body;

    const seances = await seanceService.getSeancesByIdTeacher(teacher_id, jour, semestre);

    if (!seances) {
      return res.status(404).send("Pas de séances");
    }
    res.json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSessionsByRoomId = async (req, res) => {
  try {
    const roomId = req.params.id;
    console.log(roomId);
    const seances = await seanceService.getSessionsByRoomId(roomId);
    console.log(seances);
    if (!seances) {
      return res.status(404).send("Pas de séances");
    }
    res.json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllSeances = async (req, res) => {
  try {
    const seances = await seanceService.getAllSeances();
    res.json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllSeancesByIdClasse = async (req, res) => {
  try {
    const idClasse =req.params.id
    const seances = await seanceService.getAllSeancesByIdClasse(idClasse);
    res.json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSeanceById = async (req, res) => {
  try {
    const seanceId = req.params.id;
    const { roomId, startTime, endTime, day } = req.body;
    console.log(seanceId);
    console.log(req.body);

    const deletedSeance = await seanceService.deleteSeance(seanceId, { roomId, startTime, endTime, day });

    if (!deletedSeance) {
      return res.status(404).send("Seance not found");
    }

    res
      .status(200)
      .json({ message: "Seance deleted successfully", data: deletedSeance });
  } catch (error) {
    console.error("Error in deleteSeanceById controller:", error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
  deleteSeanceById,
  getAllSeances,
  getSeanceById,
  updateSeanceById,
  createSeance,
  getAllSeancesByIdClasse,
  getSeancesByIdTeacher,
  getSessionsByRoomId
};
