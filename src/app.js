const express = require('express')
const app = express()
//const route = new express.Router()
//express.json: configurar para receber json nos request
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//falta incluir a rota
const index = require('./routes/index')
app.use('/', index)

module.exports = app;