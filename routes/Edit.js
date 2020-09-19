const express = require("express");
const router = express.Router();
const Formulaire = require("../models/Formulaire");

// stackoverflow
/* 
const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId("4edd40c86762e0fb12000003");
console.log(id);
*/

// POST
router.post("/edit/:id", async (req, res) => {
  try {
    console.log("req.fields ->", req.fields);

    const search = await Formulaire.findById({ _id: req.fields.id });

    if (req.fields.title) {
      search.title = req.fields.title;
    }
    if (req.fields.liste) {
      const tabListe = req.fields.liste;

      // pas d'_id -> on rajoute un input
      for (let i = 0; i < tabListe.length; i++) {
        if (tabListe[i]._id === undefined) {
          console.log("pas d'_id", tabListe[i]);
          search.liste.push({
            name: tabListe[i].name,
            question: tabListe[i].valueInput,
          });
        } else {
          // id existe -> MAJ
          if (search.liste[i]._id) {
            search.liste[i].question = tabListe[i].valueInput;
          }
        }
      }
    }
    await search.save();
    res.status(200).json("Edit a jour ok");
  } catch (error) {
    resizeTo.status(400).json({ message: error.message });
  }
});

// GET
router.get("/edit/:id", async (req, res) => {
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
