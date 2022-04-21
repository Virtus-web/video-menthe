const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const mongoose = require('mongoose')
require ("dotenv").config()
//const morgan = require('morgan)

//#SET UP DE L'APP#
const app = express()

mongoose.connect('mongodb://127.0.0.1/videoMenthe', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
mongoose.Promise = global.Promise


// app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/api/video', express.static('uploads'))
app.use('/api/upload', require('./routes/upload'))
app.use('/api/files', require('./routes/files'))

module.exports = app
