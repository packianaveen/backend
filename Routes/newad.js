let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const cloudinary = require("../cloudinary");
let path = require("path");
const multer = require("multer");
let adSchema = require("../Models/Newad");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "Images");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.route("/getAd").get((req, res) => {
  adSchema
    .find()
    .then((colur) => res.json(colur))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/deleteAd/:id").delete((req, res) => {
  adSchema
    .findByIdAndRemove(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/editAd/:id").get((req, res) => {
  adSchema
    .findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/adedit/:id").patch((req, res) => {
  adSchema
    .findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        url: req.body.url,
        admin: req.body.admin,
        photo: req.body.photo,
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router
  .route("/add")
  .post(upload.single("photo"))
  .post(async (req, res) => {
    console.log(req.file);
    const upload = await cloudinary.v2.uploader.upload(
      req.file.path,
      (use_filename) => true
    );
    const name = req.body.name;
    const services = req.body.services;
    const admin = req.body.admin;
    const photo = upload.url;
    const newAd = new adSchema({ name, services, photo, admin });
    newAd
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
