const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();

const catogery = require("./Routes/catogeries_route");
const frontend = require("./Routes/frontend");
const newad = require("./Routes/newad");
const bottomadd = require("./Routes/bottomad");
const trendadd = require("./Routes/trendad");
const auth = require("./Routes/auth");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT | 5000;
app.use("/images", express.static(__dirname + "/Images"));
app.use(express.json());

app.use(cors());
app.use("/api", newad);
app.use("/api", catogery);
app.use("/api", frontend);
app.use("/api", auth);
app.use("/api", bottomadd);
app.use("/api", trendadd);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`listining at port ${PORT}`));
