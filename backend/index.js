const express = require('express')
require('express-async-errors')
const app = express()
const connectDB = require('./db/connect')
const books = require('./routes/books')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use('/api/books', books)
app.use(errorHandler)
app.use(notFound)

require('dotenv').config()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

async function start() {
    try {
        await connectDB(MONGO_URI)
        app.listen(PORT, () => {
            console.log('NABER BEN BAŞLADIM. PORT:', PORT)
        });
    } catch (error) {
        console.log('HATA!!!!!!!!!!!', error)
    }
}

start()