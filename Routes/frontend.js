let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let path = require("path");

let frontendSchema = require("../Models/Frontend");

router.route("/updatetheme/:id").post((req, res) => {
  frontendSchema
    .findById(req.params.id)
    .then((response) => {
      console.log(response.colur);
      response.colur = req.body.color.colur;
      response.topText = req.body.topText;
      console.log(response);
      response
        .save()
        .then((theme) => res.json(theme))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getTheme").get((req, res) => {
  frontendSchema
    .find()
    .then((theme) => res.json(theme))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
