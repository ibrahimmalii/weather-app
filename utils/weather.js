const request = require('postman-request');

/*
* weatherstack.com
* To get temp of any location
* http://api.weatherstack.com/current? access_key = YOUR_ACCESS_KEY &query=37.8267,-122.4233
*/


const getWeather = (long, lat, callback) => {
    const weatherLocationToken = '3160f8c1824f04969d65a896cac3a1e7';
    const url = `http://api.weatherstack.com/current?access_key=${weatherLocationToken}&query=${long},${lat}`;

    request({ url, json: true }, (error, {body}) => {
        const data = body;

        if (error) {
            callback('error in connection', undefined);
        } else if (body.error) {
            callback('error to get data, please write another coordinates', undefined);
        } else {
            callback(undefined, { temp: data.current.temperature, location: data.location.country })
        }

    });
}

module.exports = getWeather;
