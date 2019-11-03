const request = require("request");
const fetchWeather = require("./fetchWeather");

//constants for geoCoding=>
const geoCodingBaseUrl = "https://api.mapbox.com/geocoding/v5/";
const forwardGeoCodingEndpoint = "mapbox.places/";
const geoCodingAccessCode =
  "pk.eyJ1IjoiY2hvbGFubWFkYWxhIiwiYSI6ImNrMGcyMWx5ZTAydjUzY25xNG00Z2N1bTYifQ.mLPeb9TZXiTLUDITEZ0AFw";

const geoCode = (address, callback) => {
  const geoCodingUrl = `${geoCodingBaseUrl}${forwardGeoCodingEndpoint}${encodeURIComponent(
    address
  )}.json?limit=1&access_token=${geoCodingAccessCode}`;

  //making the api call
  request(
    { url: geoCodingUrl, json: true },
    (error, response) => {
      let featureList = [];
      // { body: { features: featureList } }
      featureList = response ? response.body.features : [];
      
      if (error) {
        callback("Unable to connect to the GeoCoding service", undefined);
      } else if (!featureList.length) {
        callback(
          "No results found for the provided location from the GeoCoding service.Try by another location.",
          undefined
        );
      } else {
        callback(undefined, {
          latitude: featureList[0].center[1],
          longitude: featureList[0].center[0],
          location: featureList[0].place_name
        });
      }
    }
  );
};

module.exports = geoCode;
