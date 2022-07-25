const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const routes = require('./routes')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', routes)

const PORT = config.get('port') ?? 8080
async function start() {
    try {
      // await mongoose.connect(config.get('mongoUri'))
      await mongoose.connect(process.env.MONGO_URI)
      console.log('MongoDB connected');
      app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
    } catch (error) {
      console.log(error.message);
      process.exit(1)
    }

}
start()

