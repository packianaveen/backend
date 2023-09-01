let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const multer = require("multer");

let servicesSchema = require("../Models/serviceReq");

router
  .route("/createRequest")

  .post((req, res) => {
    const catagery = req.body.data;
    const service = req.body.service;
    const user = req.body.user;
    const newAd = new servicesSchema({ catagery, service, user });
    newAd
      .save()
      .then((cat) => res.json(cat))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router.route("/getRequestedservice").get((req, res) => {
  servicesSchema
    .find()
    .then((colur) => res.json(colur))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/getrequestservice/:id").get((req, res) => {
  servicesSchema
    .find({ user: { $in: [req.params.id] } })

    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
