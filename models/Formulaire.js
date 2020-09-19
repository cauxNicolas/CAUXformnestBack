const mongoose = require("mongoose");
const Schema = mongoose.Schema; // permet de savoir si c'est une string ou number

const Formulaire = mongoose.model("Formulaire", {
  title: String,
  liste: [{ name: String, question: String, reponse: [Schema.Types.Mixed] }],
});

module.exports = Formulaire;
