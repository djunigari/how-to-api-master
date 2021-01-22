const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
require('./config/mongodb')

app.db = db
app.mongoose = mongoose

consign()
    .include('./config/passport.js')    
    .include('./config/passportApiKey.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(7000,() => {
    console.log('Backend executando...')
})