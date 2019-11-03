const request = require("request");

const fetchWeather = (coordinates, callback) => {
  //weather api details
  const baseURL = "https://api.darksky.net/forecast";
  const accessCode = "7e0107a46ad6ffecfadb1ef03ad01b17";
  const url = `${baseURL}/${accessCode}/${coordinates}?units=si`;
  const options = {
    url: url,
    json: true //to receive the response which is already parsed and in json format
  };

  //making the api call
  request(options, (error, {body:responseBody}) => {
    if (error) {
      callback("Unable to connect to the Weather service", undefined);
    } else if (responseBody.error) {
      callback(
        "Coordinates are not provided properly. Please check and make a request again.",
        undefined
      );
    } else {
      const { currently, daily } = responseBody;
      const currentWeather = `${daily.summary} It's ${currently.temperature} degrees out and ${currently.precipProbability}% chance of rain.`;
      callback(undefined, currentWeather);
    }
  });
};

module.exports = fetchWeather;
