const seanceDao = require("../../dao/SeanceDao/SeanceDao");
const SalleDisponibiliteService = require("../../services/SalleDisponibiliteServices/SalleDisponibiliteServices");

const createSeance = async (data) => {
  console.log("data", data);
  let session = await seanceDao.createSeance(data);
  await SalleDisponibiliteService.updateDisponibiliteSalle(
    data.salle,
    data.heure_debut,
    data.heure_fin,
    data.jour,
    "1",
    data.type_seance
  );
  return session;
};

const updateSeance = async (id, updateData) => {
  return await seanceDao.updateSeance(id, updateData);
};

const getSeanceById = async (id) => {
  return await seanceDao.getSeanceById(id);
};

const getSeancesByIdTeacher = async (teacherId, jour, semestre) => {
  return await seanceDao.getSeancesByIdTeacher(teacherId, jour, semestre);
};

const getSessionsByRoomId = async (roomId) => {
  return await seanceDao.getSessionsByRoomId(roomId);
};

const getAllSeances = async () => {
  const result = await seanceDao.getSeances();
  return result;
};

const getAllSeancesByIdClasse = async (idClasse) => {
  const result = await seanceDao.getSeancesByIdClasse(idClasse);
  return result;
};

const deleteSeance = async (id, data) => {
  try {
    const deletedSeance = await seanceDao.deleteSeance(id);

    if (!deletedSeance) {
      throw new Error("Seance not found");
    }
    let occupationType = ""; // Turned fresh 
    await SalleDisponibiliteService.updateDisponibiliteSalle(
      data.roomId,
      data.startTime,
      data.endTime,
      data.day,
      "0",
      occupationType
    );

    return deletedSeance;
  } catch (error) {
    console.error("Error deleting seance:", error);
    throw error;
  }
};

module.exports = {
  deleteSeance,
  getAllSeances,
  getSeanceById,
  updateSeance,
  createSeance,
  getAllSeancesByIdClasse,
  getSeancesByIdTeacher,
  getSessionsByRoomId
};
