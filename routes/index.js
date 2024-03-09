const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to CoderSchool!");
});
// CAR

const carAPI = require("./car.api");
router.use("/car", carAPI);

module.exports = router;
