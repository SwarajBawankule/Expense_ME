/* 
   ! 1) dependencies installed FOR BACKEND:
   - express
   - cors
   - dotenv
   - nodemon
   - mongoose

   ! 2) how to start the backend server: 
   - on terminal type: npm start

   ! 3) the scripts inside package.json must be changed to the example below using nodemon:
   "scripts": {
    "start": "nodemon app.js"
    },
*/

require('dotenv').config() // Load environment variables from .env

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') // Import mongoose for DB connection

const app = express()
const { readdirSync } = require('fs')

// Retrieve values from .env
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

// ! middlewares
app.use(express.json())
app.use(cors())

// ! routes -- using readdirSync to access the routes' folder
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// ! Database connection using mongoose
const db = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.log('DB Connection Error:', error.message)
    }
}

// ! server
const server = () => {
    db() // Initialize the DB connection
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
