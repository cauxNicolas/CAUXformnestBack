const express = require("express");
const router = express.Router();
const Formulaire = require("../models/Formulaire");

router.post("/form", async (req, res) => {
  try {
    const title = req.fields.title;
    const tabListe = [];
    const question = req.fields; // on recupere le useState d'objet
    const _id = req.fields._id;

    if (!req.fields._id) {
      // premiere connexion
      const newFormulaire = new Formulaire({
        title: title,
        liste: tabListe,
      });

      await newFormulaire.save();
      res.status(200).json({ _id: newFormulaire._id });
    } else {
      const search = await Formulaire.findById({ _id: _id });

      if (search) {
        for (let i = 0; i < question.liste.length; i++) {
          if (question.liste[i].name === "text") {
            tabListe.push({
              name: question.liste[i].name,
              question: question.liste[i].valueInput,
            });
          } else if (question.liste[i].name === "note") {
            tabListe.push({
              name: question.liste[i].name,
              question: question.liste[i].valueInput,
            });
          }
        }
        search.liste = tabListe;
        await search.save();
        res.status(200).json("Question mise à jour");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
