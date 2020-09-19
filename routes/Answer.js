const express = require("express");
const router = express.Router();
const Formulaire = require("../models/Formulaire");

// POST
router.post("/answer/:id", async (req, res) => {
  try {
    const tabReponse = req.fields.reponse;
    const search = await Formulaire.findById({ _id: req.fields._id });

    // on chercher l'inidex de l'id
    for (let i = 0; i < search.liste.length; i++) {
      // stackoverflow
      let index = tabReponse.findIndex(
        (item) => item._id === String(search.liste[i]._id)
      );

      search.liste[i].reponse.push(tabReponse[index].reponse);
    }
    await search.save();

    res.status(200).json("route answer ok");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET
router.get("/answer/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const search = await Formulaire.findById({ _id: req.params.id }).select(
        `_id title liste`
      );
      res.status(200).json(search);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
