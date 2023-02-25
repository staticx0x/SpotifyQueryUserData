const axios = require('axios')
const express = require('express')
const app = express()
const mainRoutes = require('./routes/mainRoutes')

app.use('/', mainRoutes)

console.log('Server running on port 3000')
app.listen(3000)