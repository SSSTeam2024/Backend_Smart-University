const etudiantDao = require("../../dao/StudentDao/StudentDao");
const fs = require('fs');
const path = require('path');

const registerEtudiant = async (userData, documents) => {
  try {
    const saveResult = await saveDocumentToServer(documents);
    if (saveResult) {
      const newEtudiant = await etudiantDao.createEudiant(userData);
      return newEtudiant;
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error('Error registering etudiant:', error);
    throw error;
  }
};

const saveDocumentToServer = async (documents) => {
  try {
    for (const file of documents) {
      if (file.base64String && file.name) {
        await saveAdministrativeFile(file.base64String, file.name);
      } else {
        console.error('Base64 string or name is undefined for file:', file);
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error('Error saving documents:', error);
    return false;
  }
};

const saveAdministrativeFile = async (base64String, filePath) => {
  return new Promise((resolve, reject) => {
    const binaryData = Buffer.from(base64String, 'base64');
    const dirPath = path.dirname(filePath);
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        reject(err);
      } else {
        fs.writeFile(filePath, binaryData, 'binary', (err) => {
          if (err) {
            console.error('Error saving the file:', err);
            reject(err);
          } else {
            console.log('File saved successfully!');
            resolve();
          }
        });
      }
    });
  });
};

const getEtudiants = async () => {
  const result = await etudiantDao.getEtudiants();
  return result;
};

module.exports = {
    getEtudiants,
    registerEtudiant
};
