var express = require('express');
var bodyParser = require('body-parser')
var loginRoutes = require('./routes/LoginRoute')
var taskRoutes = require('./routes/TaskRoute')
var projectRoutes = require('./routes/ProjectRoute')
var projectTaskRoutes = require('./routes/ProjectTaskRoute')
var cors = require('cors')

var app = express()

global.appSessions = []

const porta = 8888

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('./public/index.html')
})

app.use('/', loginRoutes)
app.use('/', taskRoutes)
app.use('/', projectRoutes)
app.use('/', projectTaskRoutes)

app.listen(porta, ()=>console.log(`Aplicativo rodando na porta ${porta}`))