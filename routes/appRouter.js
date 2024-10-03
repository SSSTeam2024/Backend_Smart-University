const Router = require('express');
const router = new Router();
const etatPersonnelRoutes = require("./etatPersonnelRoutes/etatPersonnelRoutes");
const postePersonnelRoutes = require("./postePersonnelRoutes/postePersonnelRoutes");
const gradePersonnelRoutes = require("./GradePersonnelRoutes/GradePersonnelRoutes");
const categoriePersonnelRoutes = require("./CategoriePersonnelRoutes/CategoriePersonnelRoutes");
const servicePersonnelRoutes = require("./ServicesPersonnelRoutes/ServicesPersonnelRoutes");
const userRoutes = require("./UserRoutes/UserRoutes");

const etatEnseignantRoutes = require("./EtatCompteEnseignantRoutes/EtatCompteEnseignantRoutes");
const posteEnseignantRoutes = require("./PosteEnseignantRoutes/PosteEnseignantRoutes");
const gradeEnseignantRoutes = require("./GradeEnseignantRoutes/GradeEnseignantRoutes");
const specialiteEnseignantRoutes = require("./SpecialiteEnseignantRoutes/SpecialiteEnseignantRoute");


const etatEtudiantRoutes = require("./EtatCompteEtudiantRoutes/EtatCompteEtudiantRoutes");
const typeInscriptionEtudiantRoutes = require("./TypeInscriptionEtudiantRoutes/TypeInscriptionEtudiantRoutes");


const departmentRoutes = require("./DepartementRoutes/DepartementRoutes");

const niveauClasseRoutes = require("./NiveauClasseRoutes/NiveauClasseRoutes");

const sectionClasseRoutes = require("./SectionClasseRoutes/SectionClasseRoutes");


const matiereRoutes = require("./MatiereRoutes/MatiereRoutes");

const salleRoutes = require("./SalleRoutes/SalleRoutes");

const classeRoutes = require("./ClasseRoutes/ClasseRoutes");

const etudiantRoutes=require("./EtudiantRoutes/EtudiantRoutes")

const enseignantRoutes=require("./EnseignantRoutes/EnseignantRoutes")

const personnelRoutes=require("./PersonnelRoutes/PersonnelRoutes")

const ficheVoeuxRoutes=require("./FicheVoeuxRoutes/FicheVoeuxRoutes")

const seanceRoutes=require("./SeanceRoutes/SeanceRoutes")

const disponibiliteSalleRoutes=require("./DisponibiliteSalleRoutes/DisponibiliteSalleRoutes");

const papierAdministratif =require("./PapierAdministratifRoutes/PapierAdministratifRoutes");

const dossierAdministratif = require("./DossierAdministratifRoutes/DossierAdministratifRoutes")

//papier administratif 
router.use('/papierAdministratif',papierAdministratif);

//dossier administratif 
router.use('/dossierAdministratif',dossierAdministratif);

//fiche voeux
router.use('/fiche-voeux',ficheVoeuxRoutes);

//Seance
router.use('/seance',seanceRoutes);

//disponibilite
router.use('/disponibilite-salle',disponibiliteSalleRoutes);

// parametre compte personnel
router.use('/etat-personnel',etatPersonnelRoutes);
router.use('/poste-personnel',postePersonnelRoutes);
router.use('/grade-personnel',gradePersonnelRoutes);
router.use('/categorie-personnel',categoriePersonnelRoutes);
router.use('/service-personnel',servicePersonnelRoutes);
router.use("/user", userRoutes);
// parametre compte enseignant
router.use('/etat-enseignant',etatEnseignantRoutes);
router.use('/poste-enseignant',posteEnseignantRoutes);
router.use('/grade-enseignant',gradeEnseignantRoutes);
router.use('/specialite-enseignant',specialiteEnseignantRoutes);

// parametre compte etudiant
router.use('/etat-etudiant',etatEtudiantRoutes);
router.use('/type-inscription-etudiant',typeInscriptionEtudiantRoutes);
router.use("/etudiant", etudiantRoutes);

//enseignant
router.use('/enseignant',enseignantRoutes);
// personnel 
router.use('/personnel',personnelRoutes);


// departement
router.use("/department", departmentRoutes);

//niveau classe

router.use("/niveau-classe", niveauClasseRoutes);
// section classe

router.use("/section-classe", sectionClasseRoutes);

//matiere

router.use("/matiere", matiereRoutes);
//Salle
router.use("/salle", salleRoutes);

//Classe
router.use("/classe", classeRoutes);



module.exports = router;