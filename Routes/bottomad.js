let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let path = require("path");
const multer = require("multer");
let bottomadSchema = require("../Models/Bottomad");

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
        photo: req.body.photo,
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router
  .route("/bottomadd")
  .post(upload.single("photo"))
  .post((req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    const photo = req.file.filename;
    const newAd = new bottomadSchema({ name, url, photo });
    newAd
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });
router
  .route("/bottomadd1")
  .post(upload.single("photo"))
  .post((req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    const photo = req.file.filename;
    const newAd = new bottomadSchema({ name, url, photo });
    newAd
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router
  .route("/add1")
  .post(upload.single("photo"))
  .post((req, res) => {
    const name = req.body.name;

    const photo = req.file.filename;
    const newAd = new bottomadSchema({ name, photo });
    newAd
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
