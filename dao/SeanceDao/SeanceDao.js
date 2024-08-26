const seanceModel = require("../../models/SeancesModel/SeancesModel")

const createSeance = async (seance) => {
  try {
    return await seanceModel.create(seance);
  } catch (error) {
    console.error("Error creating seance:", error);
    throw error;
  }
};

const getSeances = async () => {
  try {
    return await seanceModel.find().populate('classe').populate('matiere').populate('enseignant').populate('salle');
  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};


const getSeancesByIdClasse = async (idClasse) => {
  try {

    const query = {
      classe: idClasse
    }
    return await seanceModel.find(query).populate('classe').populate('matiere').populate('enseignant').populate('salle');

  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};


const updateSeance = async (id, updateData) => {
  try {
    return await seanceModel.findByIdAndUpdate(id, updateData, { new: true }).populate('classe').populate('matiere').populate('enseignant').populate('salle');
  } catch (error) {
    console.error("Error updating seance:", error);
    throw error;
  }
};

const deleteSeance = async (id) => {
  try {
    return await seanceModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting seance:", error);
    throw error;
  }
};

const getSeanceById = async (id) => {
  try {
    return await seanceModel.findById(id).populate('classe').populate('matiere').populate('enseignant').populate('salle');
  } catch (error) {
    console.error("Error fetching seance by ID:", error);
    throw error;
  }
};

const getSeancesByIdTeacher = async (teacherId, jour, semestre) => {
  try {

    const query = {
      enseignant: teacherId,
      jour: jour,
      semestre: semestre
    }
    return await seanceModel.find(query).populate('classe').populate('matiere').populate('enseignant').populate('salle');

  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};

const getSessionsByRoomId = async (roomId) => {
  try {

    const query = {
      salle: roomId,
    }
    return await seanceModel.find(query).populate('classe').populate('matiere').populate('enseignant').populate('salle');

  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};


module.exports = {
    getSeanceById,
    deleteSeance,
    updateSeance,
    getSeances,
    createSeance,
    getSeancesByIdClasse,
    getSeancesByIdTeacher,
    getSessionsByRoomId
};