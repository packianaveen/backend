let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let path = require("path");
const multer = require("multer");
let bottomadSchema = require("../Models/Bottomad");
const cloudinary = require("../cloudinary");
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "images");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.route("/getbottomAd").get((req, res) => {
  bottomadSchema
    .find()
    .then((colur) => res.json(colur))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/deletebottomAd/:id").delete((req, res) => {
  bottomadSchema
    .findByIdAndRemove(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/editbottomAd/:id").get((req, res) => {
  bottomadSchema
    .findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/bottomedit/:id").patch((req, res) => {
  bottomadSchema
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
  .route("/add1")
  .post(upload.single("photo"))
  .post(async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(
      req.file.path,
      (use_filename) => true
    );
    const name = req.body.name;
    const admin = req.body.admin;
    const photo = upload.url;
    const newAd = new bottomadSchema({ name, photo, admin });
    newAd
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
