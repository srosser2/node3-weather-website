const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))


const indexPage = {
  title: "Weather",
  body: "Sam Rosser"
}

const aboutPage = {
  title: "About",
  body: "About the weather"
}

const helpPage = {
  title: "Help",
  body: "This is the help page"
}

const help404 = {
  title: "Help",
  body: "Help article not found"
}

const generic404 = {
  title: "404",
  body: "404 Error - page not found"
}



app.get('', (req, res) => {
    res.render('index', indexPage)
})

app.get('/about', (req, res) => {
    res.render('about', aboutPage)
})

app.get('/help', (req, res) => {
    res.render('help', helpPage)
})



app.get('/weather', (req, res) => {
    console.log(req)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
          if(error) {
              return res.send({ error })
          }

          forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
              }

            res.send({
              summary: forecastData.summary,
              location,
              precipProbability: forecastData.precipProbability,
              temperature: forecastData.temperature,
              address: req.query.address


            })

      })

    })

})






app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    req.query
    res.send({
        products: [],
    })
})


app.get('/help/*', (req, res) => {
    res.render('help-error', help404)
})

app.get('/*', (req, res) => {
    res.render('error', generic404)
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
