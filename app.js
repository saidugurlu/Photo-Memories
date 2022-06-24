const express = require("express");
const { default: mongoose } = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const Photo = require("./models/Photo");

const app = express();

//connect DB
mongoose.connect("mongodb://localhost/photo-memories");

const port = 3011;

//Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", async (req, res) => {
  const photos = await Photo.find({});
  res.render("index", { photos });
});

app.get("/photos/:id", async(req, res) => {
 const photo =  await Photo.findById(req.params.id);
 res.render("photo", { photo})
});


app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
