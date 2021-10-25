//==================== To make nodemon see all changes in hbs and js files (nodemon app.js js,hbs) ===================//


// path is local in core to detect any path of our project 
// hbs is a backage (handle parse) to make a dynamic content 

const geoCode = require('./utils/geoCode');
const getWeather = require('./utils/weather');

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const hbs = require('hbs');
const ejs = require('ejs');


const publicDirPath = path.join(__dirname, '../public');


// to use hbs 
app.use(express.static(publicDirPath)); // this is replace app.get('/')

// Setub handlebarse engine and views location
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partial');


app.set('view engine', 'ejs')
app.set('views', viewsPath);// Now we don't need to put views in src file (we change default path)
// hbs.registerPartials(partialsPath);// to path more files we can use registerPartials


// to send an file we need to use render (To path values like laravel)
app.get('', (req, res)=> {
    res.render('index', { // without extension
        title : 'Weather',
        name : 'Ibrahim Ali Mohamed Ibrahim'
    });
});

app.get('/about', (req, res)=> {
    res.render('about', {
        title : 'About',
        description : `This is from render file from hyper parse (hbs)=> it's great package but now we use {ejs} its better than`,
        name : 'Ibrahim Ali Mohamed Ibrahim'
    })
});

// Handle query string 
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You should to write your address first!!'
        })
    };

    console.log(req.query.address);
    geoCode(req.query.address, (error, {longitude, latitude})=>{
        if(error){
            return res.send({error});
        }

        getWeather(longitude, latitude , (error, {temp, location}={})=>{
            if(error){
                return res.send({error});
            };

            res.send({
                location : req.query.address,
                Code : req.query.address.substring(0,2).toUpperCase(),
                currentWeather : location,
                temperature : temp,
            })
        })
    })

    
})


// Handle 404 pages 
app.get('*', (req, res)=> {
    res.render('404',{
        title : '404 page',
        name : 'Ibrahim Ali Mohamed Ibrahim',
        errorMessage : 'Page Not Found!!!'
    })
})


app.listen(port, ()=>{
    console.log('Server Is Up On Port: ',port);
})



