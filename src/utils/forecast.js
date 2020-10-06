const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url="http://api.weatherstack.com/current?access_key=b94a58bed10b7b3fc40bdb961552b8b5&query="+longitude+","+latitude+"&units=f"
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+'.It is currently '+body.current.temperature+' degrees out.But it feels like '+body.current.feelslike+ ' degrees out.')
        }
    })
}

module.exports = forecast
