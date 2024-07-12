const express = require('express');
const etudiantController = require('../../controllers/StudentControllers/StudentControllers');

const router = express.Router();

router.post('/create-etudiant', etudiantController.addStudent);
router.get('/get-all-etudiant', etudiantController.getAllStudents);

module.exports = router;
