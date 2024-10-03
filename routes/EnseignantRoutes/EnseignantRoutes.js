const express = require('express');
const enseignantController = require('../../controllers/EnseignantControllers/EnseignantControllers');

const router = express.Router();

router.post('/create-enseignant', enseignantController.addEnseignant);
router.get('/get-all-enseignant', enseignantController.getEnseignants);
router.put('/update-enseignant', enseignantController.updateEnseignantById);
router.get('/get-enseignant/:id', enseignantController.getEnseignantById);
router.delete('/delete-enseignant/:id', enseignantController.deleteEnseignantById);
router.post('/:enseignantId/papier/:papierId', enseignantController.assignPapierToTeacher);

module.exports = router;
