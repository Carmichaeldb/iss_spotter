const request = require('request-promise-native');
/**
 * Fetches IP by making a request
 * Returns: users IP
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

/*
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } =  JSON.parse(data);
      return response;
    });
};

const printData = function(data) {
  for (let x of data) {
    const date = new Date(0);
    date.setUTCSeconds(x.risetime);
    console.log(`Next pass at ${date} for ${x.duration} seconds!`);
  }
};
module.exports = { nextISSTimesForMyLocation, printData };