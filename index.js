require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors());

// connexion mongoDB
mongoose.connect(process.env.MONGODB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Form = require("./routes/Form");
app.use(Form);
const Edit = require("./routes/Edit");
app.use(Edit);
const Answer = require("./routes/Answer");
app.use(Answer);
const Delete = require("./routes/Delete");
app.use(Delete);
const Home = require("./routes/Home");
app.use(Home);

// catch error
app.all(`*`, (req, res) => {
  try {
    res.status(200).json(`app.all -> route inconnue !`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("new Formnest started");
});
