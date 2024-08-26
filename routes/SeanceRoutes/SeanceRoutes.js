const express = require('express');
const seanceController = require('../../controllers/SeanceControllers/SeanceControllers');

const router = express.Router();

router.post('/create-seance', seanceController.createSeance);
router.put('/update-seance/:id', seanceController.updateSeanceById);
router.get('/get-seance/:id', seanceController.getSeanceById);
router.get('/get-all-seance/:id', seanceController.getAllSeancesByIdClasse);
router.get('/get-all-seance', seanceController.getAllSeances);
router.delete('/delete-seance/:id', seanceController.deleteSeanceById);
router.post('/get-seances-by-teacher', seanceController.getSeancesByIdTeacher);
router.get('/get-sessions-by-room/:id', seanceController.getSessionsByRoomId)
module.exports = router;