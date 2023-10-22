const { nextISSTimesForMyLocation, printData } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((result) => {
    printData(result);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });