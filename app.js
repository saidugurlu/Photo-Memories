const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const methodOverride = require("method-override");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageController");


const app = express();
dotenv.config();

//connect DB
mongoose.connect("mongodb+srv://msu:nhWPsX3sxX7fAWnV@cluster0.hztc0j3.mongodb.net/?retryWrites=true&w=majority");
mongoose.connect(process.env.MONGODB_CONNECTION);
//Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//Routes
app.get("/", photoController.getAllPhotos);

app.get("/photos/:id", photoController.getPhoto);

app.post("/photos", photoController.createPhoto);

app.put("/photos/:id", photoController.updatePhoto);

app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", pageController.getAboutPage);

app.get("/add", pageController.getAddPage);

app.get("/photos/edit/:id", pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
