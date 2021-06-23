const express = require("express");
const router = express.Router();

const Weather = require("./weather-calc-model");

router.get("/zip", async (req, res) => {

  const impOrMet = function(arr){
    if(arr.query.unit == 'Farenheit'){
      let unitVal = 'imperial'
      return unitVal
    }else{
      let unitVal = 'metric'
      return unitVal
    }
  }
    req.query.unit = impOrMet(req)
  try {
    const data = await Weather.getWeather(req);
    if(data.status === 404){
      throw new TypeError("Data not found")
    }else res.status(200).json(data);
  } catch(e) {
    res.status(404).json({ Message: "The data could not be found" });
  }
});

module.exports = router;
