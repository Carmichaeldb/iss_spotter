/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  const url = "https://api.ipify.org?format=json";
  request(url, (error, response, body) => {
    if (error) {
      callback(console.log(error), null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body));
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  request(url, (error, response, body) => {
    const data = JSON.parse(body);
    const { latitude, longitude } = data;
    if (error) {
      callback(error, null);
      return;
    }
    if (data.success === false) {
      callback(`Error: Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`, null);
      return;
    }
    callback(null, { latitude, longitude });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP };