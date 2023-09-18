let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let path = require("path");
const multer = require("multer");
let loginSchema = require("../Models/auth");

router.route("/getPhone/:phone").get((req, res) => {
  loginSchema
    .find({ phone: req.params.phone })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/checkUser").post((req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;
  loginSchema
    .find({ phone: phone })
    .then((response) => {
      if (response[0].password === password) {
        res.send(response);
      } else {
        res.send({ message: "wrong credentials" });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/getusers").get((req, res) => {
  loginSchema
    .find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/deleteuser/:id").delete((req, res) => {
  loginSchema
    .findByIdAndRemove(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/getuser/:id").get((req, res) => {
  loginSchema
    .findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/updateUser").post((req, res) => {
  var _id = req.body._id;
  var inventory = {
    phone: req.body.phone,
    pin: req.body.pin,
    password: req.body.password,
    type: req.body.type,
    admin: req.body.admin,
    status: req.body.status,
  };
  loginSchema
    .findByIdAndUpdate(_id, inventory, { new: true })
    .then((colur) => res.json(colur))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/userAd").post((req, res) => {
  const phone = req.body.phone;
  const pin = req.body.pin;
  const password = req.body.password;
  const type = req.body.type;
  const admin = req.body.admin;
  const status = req.body.status;
  const newAd = new loginSchema({ phone, pin, password, type, admin, status });
  newAd
    .save()
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
