let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const cloudinary = require("../cloudinary");
let path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "Images");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
let profileSchema = require("../Models/userProfile");

router.route("/getProfile/:user").get((req, res) => {
  profileSchema
    .find({ user: req.params.user })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/delete-profile/:id").delete((req, res) => {
  profileSchema
    .findByIdAndRemove(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});
router
  .route("/profileSave")
  .post(upload.single("photo"))
  .post(async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(
      req.file.path,
      (use_filename) => true
    );
    const name = req.body.name;
    const phone = req.body.phone;
    const photo = upload.url;
    const city = req.body.city;
    const address = req.body.address;
    const user = req.body.user;
    const newAd = new profileSchema({
      name,
      phone,
      photo,
      city,
      address,
      user,
    });
    newAd
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;

module.exports = router;
