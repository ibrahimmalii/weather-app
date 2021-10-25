const geoCode = require('./utils/geoCode');
const getWeather = require('./utils/weather');
const chalk = require('chalk');


const address = process.argv[2];

if(!address){
    console.log(chalk.bold.red.inverse('please insert value to search'));
} else {
    geoCode(address , (error, {longitude, latitude})=>{

        if(error){
            return console.log(chalk.bold.red.inverse('Error: ',error));
        }
    
        getWeather(longitude, latitude, (error, {temp, location} = {})=>{
            if(error){
                return console.log(chalk.bold.red.inverse('Error: ',error));
            }
    
            console.log(chalk.inverse.green.bold(`Your current temp: ${temp} in ${location}`))
        })
    })
}









