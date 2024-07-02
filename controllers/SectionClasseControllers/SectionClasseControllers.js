const sectionClasseService = require("../../services/SectionClasseServices/SectionClasseServices");

const addSectionClasse = async (req, res) => {
  try {
    const { name_section_ar, name_section_fr, abreviation } = req.body;

    const sectionClasse = await sectionClasseService.registerSectionClasse({
        name_section_ar, name_section_fr, abreviation 
    });
    res.json(sectionClasse);
  } catch (error) {
    console.error(error);
  }
};

const updateSectionClasseById = async (req, res) => {
  try {
    const sectionClasseId = req.params.id;
    const { name_section_ar, name_section_fr, abreviation } = req.body;

    const updatedSectionClasse = await sectionClasseService.updateSetionClasseDao(
        sectionClasseId,
      {
        name_section_ar, name_section_fr, abreviation 
      }
    );

    if (!updatedSectionClasse) {
      return res.status(404).send("Section Classe not found!");
    }
    res.json(updatedSectionClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSectionClasseById = async (req, res) => {
  try {
    const sectionClasseId = req.params.id;

    const getSectionClasse = await sectionClasseService.getSectionlasseDaoById(
        sectionClasseId
    );

    if (!getSectionClasse) {
      return res.status(404).send("Section Classe not found");
    }
    res.json(getSectionClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllSectionClasse = async (req, res) => {
  try {
    const sectionsClasse = await sectionClasseService.getSectionsClasseDao();
    res.json(sectionsClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSectionClasseById = async (req, res) => {
  try {
    const sectionClasseId = req.params.id;

    const deletedSectionClasse =
      await sectionClasseService.deleteSectionClassetDao(sectionClasseId);

    if (!deletedSectionClasse) {
      return res.status(404).send("Section Classe not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
    deleteSectionClasseById,
    getAllSectionClasse,
    getSectionClasseById,
    updateSectionClasseById,
    addSectionClasse,
};
