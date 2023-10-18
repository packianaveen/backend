let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const multer = require("multer");
// Student Model
const cloudinary = require("../cloudinary");
let servicesSchema = require("../Models/services");
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "Images");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.route("/get-service").get((req, res) => {
  servicesSchema
    .find()
    .then((colur) => res.json(colur))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/delete-service/:id").delete((req, res) => {
  servicesSchema
    .findByIdAndRemove(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/edit-service/:id").get((req, res) => {
  servicesSchema
    .findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/serviceedit/:id").patch((req, res) => {
  servicesSchema
    .findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        orderNo: req.body.orderNo,
        status: req.body.status,
        photo: req.body.photo,
        admin: req.body.admin,
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router
  .route("/create-service")
  .post(upload.single("photo"))
  .post(async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(
      req.file.path,
      (use_filename) => true
    );
    console.log(upload);
    const name = req.body.name;
    const orderNo = req.body.orderNo;
    const status = req.body.status;
    const admin = req.body.admin;
    const photo = upload.url;
    const newAd = new servicesSchema({ name, orderNo, status, photo, admin });
    newAd
      .save()
      .then((cat) => res.json(cat))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
