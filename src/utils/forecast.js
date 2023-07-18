const request = require('request')

const forecast = (latitude, longitude, callback) => {
   const url="http://api.weatherstack.com/current?access_key=cb339122fc614c7406a540b7d7096c65&query="+latitude+","+longitude+"&units=f"
    
// console.log("body2"+latitude+"    "+longitude)
// // let apiKey = "875cac9149600ec79b4b52811f2120be9";
// // let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=f&lat=${longitude}lon=${latitude}`;

// const apiKey = "5d69e7cc1b06a2682b8d16d749591722"; 
// const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            console.log("error 1",error)
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log("erorr2",body.error)
            callback('Unable to find location', undefined)
        } else {
           console.log("sucesss",body.current.temperature)
            let temperature = (body.current.temperature - 32)*0.5555;
            let feelslike = (body.current.feelslike - 32)*0.5555;


            callback(undefined,
                body.current.weather_descriptions[0]+'.It is currently '+temperature+' degree out.But it feels like '+feelslike+ ' degrees out. The humidity is '+body.current.humidity+ '%.')
        }
    })
}

module.exports = forecast
