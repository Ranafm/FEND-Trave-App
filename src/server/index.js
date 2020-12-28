let projectData = {}
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const { request } = require('http');
const { log } = require('console');
const app = express()
dotenv.config();
const fetch = require('node-fetch');

app.use(express.static('dist'))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

console.log(__dirname)

console.log(process.env.user_name);

app.listen(8081, function() {
    //  console.log('Example app listening on port 8081!')
})


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");

})
app.get('/data', function(req, res) {
    res.send(projectData)

})
app.post('/weather', function(req, res) {

    // console.log(req.body);
    projectData.input = req.body;
    console.log(projectData.input.place);
    // res.send(projectData)
    geoNamesAPI(projectData.input.place)
        .then(() => weatherbitAPI(projectData.input.length, projectData.input.start, projectData.input.end))
        .then(() => pixabayAPI(projectData.input.place))


})

//TODO: return the geoname required
async function geoNamesAPI(location) {

    console.log('geonames API begins!');

    //send request to the geonames_ap
    const getCoordinates = await fetch(`http://api.geonames.org/searchJSON?q=${projectData.input.place}&maxRows=1&username=ranafm`, { method: "Get" })
        //catch the error if the api request fails]
        .then((res) => {

            return res.json();

        }).then((res) => {
            console.log(res);
            // console.log(data);

            const coordinates = {

                    lat: res.geonames[0].lat,
                    lng: res.geonames[0].lng,
                    countryCode: res.geonames[0].countryCode,
                    city: res.geonames[0].name,
                    country: res.geonames[0].countryName
                }
                //add the lat and lon data to the object

            projectData.coords = coordinates;

            //catch the error if fetch api fails
        }).catch((error) => {

            console.log(error);
        });

    //console.log(projectData.coords);
}


//TODO: return the Weather based on user dates and trip length
async function weatherbitAPI(date, start_date, end_date) {
    let url = '';
    console.log(projectData.coords.countryCode);
    console.log("weatherbitAPI API Beginsssss!");
    console.log(date + 'here trip diffrence');
    console.log(start_date + 'here trip start');
    console.log(end_date + 'here trip end');

    if (date > 7) {
        console.log('in the future');
        url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${projectData.input.place}&country=${projectData.coords.countryCode}&lat=${projectData.coords.lat}&lon=${projectData.coords.lng}&key=ecf03e3d824f45ceaf54e37b2b27c802`
            //console.log(`https://api.weatherbit.io/v2.0/forecast/daily?city=${projectData.coords.city}&country=${projectData.coords.countryCode}&lat=${projectData.coords.lat}&lon=${projectData.coords.lng}&key=ecf03e3d824f45ceaf54e37b2b27c802`);
    } else {
        console.log('within a week');
        url = `https://api.weatherbit.io/v2.0/current?city=${projectData.input.place}&country=${projectData.coords.countryCode}&lat=${projectData.coords.lat}&lon=${projectData.coords.lng}&key=ecf03e3d824f45ceaf54e37b2b27c802`

    }

    const getForecast = await fetch(url).then((res) => {

        return res.json();

    }).then((res) => {
        //console.log(res);
        //  console.log(data);

        const forecast = {
            temp: res.data[0].temp,
            low_temp: res.data[0].low_temp,
            max_temp: res.data[0].max_temp,
            wether_desc: res.data[0].weather.description,
            wether_icon: res.data[0].weather.icon,
            wwther_code: res.data[0].weather.code,
        }
        projectData.forecast = forecast;

    }).catch((error) => {

        console.log(error);
    });

    console.log(projectData);
}


//TODO: return two pictures based on the city enterd
async function pixabayAPI(city) {

    console.log('Pixabay API Begins');

    //https://pixabay.com/api/?key=19681001-9357084b34b6df29c8ab20ae9&q=hail&image_type=photo&per_page=3
    const getPic = await fetch(`https://pixabay.com/api/?key=19681001-9357084b34b6df29c8ab20ae9&q=${projectData.input.place}&image_type=photo&per_page=3`).then((res) => {

        return res.json();

    }).then((res) => {
        //console.log(res);

        const pic = {
            pic1: res.hits[0].webformatURL,
            pic2: res.hits[1].webformatURL,
        }
        projectData.pics = pic;

    }).catch((error) => {

        console.log(error);
    });

    console.log(projectData);

}

//To do test for the server remove the comments
//export { pixabayAPI, weatherbitAPI, geoNamesAPI }
