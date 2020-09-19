const express = require("express");
const Formulaire = require("../models/Formulaire");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const search = await Formulaire.find();

    res.status(200).json(search);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
