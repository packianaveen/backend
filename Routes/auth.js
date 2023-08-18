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
        res.send(res.json(response));
      } else {
        res.send({ message: "wrong credentials" });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));

  // const newAd = new loginSchema({ phone, pin, password });
  // newAd
  //   .save()
  //   .then((response) => res.json(response))
  //   .catch((err) => res.status(400).json("Error: " + err));
});
// router.route("/deleteAd/:id").delete((req, res) => {
//   adSchema
//     .findByIdAndRemove(req.params.id, req.body)
//     .then((response) => res.json("newAd deleted"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });
// router.route("/editAd/:id").get((req, res) => {
//   adSchema
//     .findById(req.params.id)
//     .then((exercise) => res.json(exercise))
//     .catch((err) => res.status(400).json("Error: " + err));
// });
router.route("/userAd").post((req, res) => {
  const phone = req.body.phone;
  const pin = req.body.pin;
  const password = req.body.password;
  const newAd = new loginSchema({ phone, pin, password });
  newAd
    .save()
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
