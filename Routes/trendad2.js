let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let path = require("path");
const multer = require("multer");
let trendadSchema1 = require("../Models/trendad2");
const cloudinary = require("../cloudinary");
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "Images");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});
router.route("/gettrendAd1").get((req, res) => {
  trendadSchema1
    .find()
    .then((colur) => res.json(colur))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/deletetrendAd1/:id").delete((req, res) => {
  trendadSchema1
    .findByIdAndRemove(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/trendedit1/:id").patch((req, res) => {
  trendadSchema1
    .findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        url: req.body.url,
        photo: req.body.photo,
        service: req.body.service,
        admin: req.body.admin,
        catogery: req.body.catogery,
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/edittrendAd1/:id").get((req, res) => {
  trendadSchema1
    .findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router
  .route("/trendadd1")
  .post(upload.single("photo"))
  .post(async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(
      req.file.path,
      (use_filename) => true
    );
    const name = req.body.name;
    const service = req.body.service;
    const catogery = req.body.catogery;
    const admin = req.body.admin;
    const photo = upload.url;
    const newAd = new trendadSchema1({ name, service, catogery, photo, admin });
    newAd
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
