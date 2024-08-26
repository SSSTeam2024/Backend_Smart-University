const express = require('express');
const ficheVoeuxController = require('../../controllers/FicheVoeuxControllers/FicheVoeuxController');

const router = express.Router();

router.post('/create-fiche-voeux', ficheVoeuxController.addFicheVoeux);
// router.put('/update-salle/:id', salleController.updateSalleById);
// router.get('/get-salle/:id', salleController.getSalleById);
router.get('/get-all-fiche-voeux', ficheVoeuxController.getFichesVoeux);
router.delete('/delete-fiche-voeux/:id', ficheVoeuxController.deleteFicheVoeuxById);
module.exports = router;
