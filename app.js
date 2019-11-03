// const yargs = require("yargs");
const geoCode = require("./utils/geoCode");
const fetchWeather = require("./utils/fetchWeather");
const chalk = require("chalk");

// yargs.command({
//   command: "getWeather",
//   describe: "The location you want to find the weather",
//   builder: {
//     location: {
//       describe: "Note location",
//       demandOption: true,
//       type: "string"
//     }
//   },
//   handler: function({ location }) {
//     geoCode(location, (error, data) => {
//       if (error) return console.log(chalk.red.bold(error));

//       if (data && data.location) {
//         console.log(chalk.yellow(`Fetching weather for ${data.location}`));
//         fetchWeather(`${data.latitude}, ${data.longitude}`, (error, data) => {
//           if (error) return console.log(chalk.red.bold(error));
//           console.log(chalk.green(data));
//         });
//       }
//     });
//   }
// });

// yargs.parse();

//---------------------------------------------------------------------------------------------------------------------------------------

//with out using yargs
const location = process.argv[2];

if (location) {
  geoCode(location, (error, data) => {
    if (error) return console.log(chalk.red.bold(error));
    
    const {location, latitude, longitude} = data;
    if (data && location) {
      console.log(chalk.yellow(`Fetching weather for ${location}`));
      fetchWeather(`${latitude}, ${longitude}`, (error, data) => {
        if (error) return console.log(chalk.red.bold(error));
        console.log(chalk.green(data));
      });
    }
  });
} else {
  console.log(
    chalk.red("Please provide a location for fetching weather forecast. :-)")
  );
}
