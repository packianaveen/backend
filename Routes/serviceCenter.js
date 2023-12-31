let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let path = require("path");
const multer = require("multer");
let ServiceCenterSchema = require("../Models/serviceCenter");
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
router.route("/getCenter").get((req, res) => {
  ServiceCenterSchema.find()
    .then((colur) => res.json(colur))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/deleteCenter/:id").delete((req, res) => {
  ServiceCenterSchema.findByIdAndRemove(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/editCenter/:id").get((req, res) => {
  ServiceCenterSchema.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/centerEdit/:id").patch((req, res) => {
  ServiceCenterSchema.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      phoneNo: req.body.phone,
      status: req.body.Status,
      address: req.body.address,
      services: req.body.services,
      photo: req.body.photo,
      admin: req.body.admin,
      pin: req.body.pin,
    },
  })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router
  .route("/addCenter")
  .post(upload.single("photo"))
  .post(async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(
      req.file.path,
      (use_filename) => true
    );
    const name = req.body.name;
    const phoneNo = req.body.phoneNo;
    const status = req.body.status;
    const address = req.body.address;
    const services = req.body.services;
    const pin = req.body.pin;
    const admin = req.body.admin;
    const photo = upload.url;

    const newAd = new ServiceCenterSchema({
      name,
      photo,
      phoneNo,
      status,
      address,
      admin,
      services,
      pin,
    });
    newAd
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
