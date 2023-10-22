const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let x of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(x.risetime);
    console.log(`Next pass at ${date} for ${x.duration} seconds!`);
  }
});