let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const cloudinary = require("../cloudinary");
let path = require("path");
const multer = require("multer");
let trendadSchema = require("../Models/Trendad");

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
router.route("/gettrendAd").get((req, res) => {
  trendadSchema
    .find()
    .then((colur) => res.json(colur))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/deletetrendAd/:id").delete((req, res) => {
  trendadSchema
    .findByIdAndRemove(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/trendedit/:id").patch((req, res) => {
  trendadSchema
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
router.route("/edittrendAd/:id").get((req, res) => {
  trendadSchema
    .findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router
  .route("/trendadd")
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
    const newAd = new trendadSchema({ name, service, catogery, photo, admin });
    newAd
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
