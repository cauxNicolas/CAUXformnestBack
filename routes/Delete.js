const express = require("express");
const router = express.Router();
const Formulaire = require("../models/Formulaire");

router.post("/delete/:id", async (req, res) => {
  console.log(req.fields);
  try {
    if (req.fields.id) {
      const search = await Formulaire.findByIdAndDelete({ _id: req.fields.id });
      res.status(200).json("route delete id ok");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
