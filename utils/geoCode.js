const request = require('postman-request');

// To get long and lat 
/*
* Geocoding
* Mapbox.com 
* address -> long/lat
*
*/ 

const geoCode = (address , callback) => {
    const geoCodingToken = 'pk.eyJ1IjoiaWJyYWhpbWFsaWkiLCJhIjoiY2t0eGZ2ZnB0MHRkNDJzcGpleGhwMnk5diJ9.eah6Ghm2_JfeCQezKrBW3g';
    const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geoCodingToken}&limit=1`;
    
    request({url : geoCodingUrl, json : true}, (error, {body})=>{
    
        if(error){
            callback('error in connection', undefined)
        } else if (body.features.length === 0){
            callback('Error to get data', undefined)
        } else {
            const [long , lat] = body.features[0].center;
            callback(undefined ,{
                longitude : long,
                latitude : lat
            })
        }
    
    })
    
}

module.exports = geoCode;