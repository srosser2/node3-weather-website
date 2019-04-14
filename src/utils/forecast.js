const request = require('request');

const forecast = (lat, long, callback) => {
      const url = `https://api.darksky.net/forecast/fef6662741c36687c05be1ec43bb2aec/${lat},${long}?units=si`

      request({url, json: true}, (error, response) => {
      if (error){
          callback('Unable to connect to DarkSky API', undefined);

      } else if (response.body.error){
          callback('Unable to find location', undefined);

      } else {

          callback(undefined, {
            summary: response.body.daily.data[0].summary,
            temperature: response.body.currently.temperature
          })
      }
    })
}

module.exports = forecast;
