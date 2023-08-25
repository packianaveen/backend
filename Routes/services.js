let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const multer = require("multer");
// Student Model

let servicesSchema = require("../Models/services");
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "images");
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
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router
  .route("/create-service")
  .post(upload.single("photo"))
  .post((req, res) => {
    const name = req.body.name;
    const orderNo = req.body.orderNo;
    const status = req.body.status;
    const photo = req.file.filename;
    const newAd = new servicesSchema({ name, orderNo, status, photo });
    newAd
      .save()
      .then((cat) => res.json(cat))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
