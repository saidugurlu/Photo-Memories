const express = require("express");
const { default: mongoose } = require("mongoose");
const methodOverride = require("method-override");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const Photo = require("./models/Photo");

const app = express();

//connect DB
mongoose.connect("mongodb://localhost/photo-memories");

//Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//Routes
app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort("-dateCreated");
  res.render("index", { photos });
});

app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", { photo });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/photos", async (req, res) => {
  /*   await Photo.create(req.body);
  res.redirect("/"); */

  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadeImage.name;

  uploadeImage.mv(
    uploadPath,

    async () => {
      await Photo.create({
        ...req.body,
        image: "/uploads/" + uploadeImage.name,
      });
      res.redirect("/");
    }
  );
});

app.get("/photos/edit/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render("edit", { photo });
});

app.put("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
});

app.delete("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/public" + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect("/");
});

const port = 3011;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
