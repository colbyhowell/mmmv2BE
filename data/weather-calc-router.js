const express = require("express");
const router = express.Router();

const Weather = require("./weather-calc-model");

router.get("/:zip", async (req, res) => {
  const zip = req.params.zip;
  try {
    const data = await Weather.getWeather(zip);
    res.status(200).json(data);
  } catch {
    res.status(404).json({ Message: "The data could not be found" });
  }
});

module.exports = router;
