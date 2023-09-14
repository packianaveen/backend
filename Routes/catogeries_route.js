let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const multer = require("multer");
// Student Model

let catgeriesSchema = require("../Models/Catogeries");
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "Images");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.route("/get-catogery").get((req, res) => {
  catgeriesSchema
    .find()
    .then((colur) => res.json(colur))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/delete-catogery/:id").delete((req, res) => {
  catgeriesSchema
    .findByIdAndRemove(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/edit-catogery/:id").get((req, res) => {
  catgeriesSchema
    .findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/serviceedit/:id").patch((req, res) => {
  catgeriesSchema
    .findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        orderNo: req.body.orderNo,
        status: req.body.status,
        photo: req.body.photo,
        services: req.body.services,
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router
  .route("/create-catogery")
  .post(upload.single("photo"))
  .post((req, res) => {
    const name = req.body.name;
    const orderNo = req.body.orderNo;
    const status = req.body.status;
    const services = req.body.services;
    const photo = req.file.filename;
    const newAd = new catgeriesSchema({
      name,
      orderNo,
      status,
      photo,
      services,
    });
    newAd
      .save()
      .then((cat) => res.json(cat))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
