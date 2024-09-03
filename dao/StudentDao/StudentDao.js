const etudiantModel = require("../../models/EtudiantsModel/EtudiantsModel")

const createEudiant = async (etudiant) => {
  return await etudiantModel.create(etudiant);
};

const getEtudiants = async () => {
  try {
    const etudiants = await etudiantModel.find()
      .populate('etat_compte')
      .populate('type_inscription')
      .populate({
        path: 'groupe_classe',
        populate: [
          {
            path: 'niveau_classe',
            populate: {
              path: 'sections',
              populate: {
                path: 'departements',
                populate: {
                  path: 'sections'
                }
              }
            }
          },
          {
            path: 'departement'
          },
          {
            path: 'matieres'
          }
        ]
      });

    return etudiants;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

const deleteEtudiant = async (id) => {
  return await etudiantModel.findByIdAndDelete(id);
};

const updateEtudiant= async (id, updateData) => {
  return await etudiantModel.findByIdAndUpdate(id, updateData, { new: true });
};

const getStudentById = async (id) => {
  try {
    return await etudiantModel
      .findById(id)
      .populate('etat_compte')
      .populate('type_inscription')
      .populate({
        path: 'groupe_classe',
        populate: [
          {
            path: 'niveau_classe',
            populate: {
              path: 'sections',
              populate: {
                path: 'departements',
                populate: {
                  path: 'sections'
                }
              }
            }
          },
          {
            path: 'departement'
          },
          {
            path: 'matieres'
          }
        ]
      });
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    throw error;
  }
};


const getTypeInscriptionByIdStudent = async (studentId) => {
  try {
    const student = await etudiantModel.findById(studentId).populate('type_inscription');
    if (!student) {
      throw new Error('Student not found');
    }
    return student.type_inscription;
  } catch (error) {
    console.error('Error fetching TypeInscription by Student ID:', error);
    throw error;
  }
};



module.exports = {
 
    createEudiant,
    getEtudiants,
    deleteEtudiant,
    updateEtudiant,
    getStudentById,
    getTypeInscriptionByIdStudent
};