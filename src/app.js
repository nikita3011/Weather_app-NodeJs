const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join (__dirname,'../templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather ',
        name:'Nikita Ghule'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Nikita Ghule'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText:'Get to know weather conditions around the world.',
        title:'Help',
        name:'Nikita Ghule'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"Must provide address."
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}={}) => {
            if(error){
                res.send({ error })
            }
            console.log("body3  "+latitude+"    "+longitude)

            forecast( latitude, longitude, (error, forecastData) => {
                if(error){
                    res.send({ error })
                }
                
                res.send({
                    forecast: forecastData,
                    location,
                     address:req.query.address
                })
            })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
       return res.send({
            error:"You must provide an search term."
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404 help',
        name:'Nikita Ghule',
        errorMessage:'Help article not found'

    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:404,
        name:'Nikita Ghule',
        errorMessage:'Page not found'
    })
})

app.listen(port,() => {
    console.log('Server is up on port '+port)
})