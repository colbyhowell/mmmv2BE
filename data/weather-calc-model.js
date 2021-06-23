const axios = require("axios");

function getWeather(params) {
  return axios
  .get( 
      `http://api.openweathermap.org/data/2.5/forecast?zip=${params.query.zip}&appid=e05fcca67ee38ae893eff916b9f646f2&units=${params.query.unit}`
    )
    .then((res) => {
      const weatherData = [];
      res.data.list.map((d) => {
        weatherData.push(d.main.temp);
      });

      return weatherData
    })
    .catch((err) => {
      console.log(err.response);
    });
}

module.exports = {
  getWeather,
};