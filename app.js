const express = require("express");
const { default: mongoose } = require("mongoose");
const methodOverride = require("method-override");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const Photo = require("./models/Photo");
const photoController = require("./controllers/photoControllers");

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
app.get("/", photoController.getAllPhotos);

app.get("/photos/:id", photoController.getPhoto);

app.post("/photos", photoController.createPhoto);

app.put("/photos/:id", photoController.updatePhoto);


app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});


app.get("/photos/edit/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render("edit", { photo });
});




const port = 3011;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
