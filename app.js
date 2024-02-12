require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorMidleware = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const app = express()

app.use(cors())
app.use(express.json())

//service
app.use('/auth', authRoute )

// notFound
app.use( notFound )

// error midleWare
app.use( errorMidleware )

let port = process.env.PORT || 8000
app.listen(port, () => console.log('Server on Port :', port))