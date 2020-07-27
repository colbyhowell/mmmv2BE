const axios = require("axios");

function getWeather(params) {
  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?zip=${params}&appid=e05fcca67ee38ae893eff916b9f646f2`
    )
    .then((res) => {
      const tempData = [];
      const city = res.data.city.name;
      res.data.list.forEach((d) => {
        tempData.push(d.main.temp);
      });

      const mean = (...meanArr) =>
        meanArr.reduce((a, cv) => a + cv, 0) / meanArr.length;

      const median = (medArr) => {
        let midNum = Math.floor(medArr.length / 2);
        let theMedian = 0;
        medArr.sort((a, b) => a - b);
        return medArr.length % 2 === 0
          ? (medArr[midNum - 1] + medArr[midNum / 2]) / 2
          : medArr[midNum];
      };

      const mode = (modeArr) => {
        var numCounts = [];
        var sortedArray = modeArr.sort((a, b) => a - b);
        sortedArray.forEach((num, i, arr) => {
          var compared = arr[i + 1];
          if (num === compared) {
            numCounts.push(num);
          }
        });

        let theMode = [...new Set(numCounts)];

        return theMode.toString();
      };

      return {
        mean: mean(...tempData),
        median: median(tempData),
        mode: mode(tempData),
        city: city,
      };
    })
    .catch((err) => {
      console.log(err.response);
    });
}

module.exports = {
  getWeather,
};
