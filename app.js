
const express = require('express')
const morgan = require("morgan")
const createHttpErrors = require('http-errors')


const app = express()

app.use(morgan('dev'))

app.get('/', (req, res) => res.send({"message": "running"}))

app.use((req, res, next) => {
    next(createHttpErrors.NotFound())
})

app.use((error, req, res, next) => {
    error.status = error.status || 500
    res.status(error.status).send(error)
})

module.exports = app