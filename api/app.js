const express = require('express')
const bodyParser = require('body-parser')
var loginRoutes = require('./routes/Login')
var taskRoutes = require('./routes/TaskRoute')
var projectRoutes = require('./routes/ProjectRoute')
var projectTaskRoutes = require('./routes/ProjectTaskRoute')

const porta = 8888

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json)

app.use('/login', LoginRoutes)
app.use('/task', taskRoutes)
app.use('/project', projectRoutes)
app.use('projecttask', projectTaskRoutes)

app.listen(porta, ()=>console.log(`Aplicativo rodando na porta ${porta}`))