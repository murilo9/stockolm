const express = require('express'),
    router = express.Router(),
    Task = require('../models/TaskModel')
    auth = require('../middlewares/Auth')

//GET for task
router.get('/task', () => {
    //Coleta todas as tarefas
})

router.get('/task/:id', () => {
    //Coleta uma tarefa específica
})

//POST for task
router.post('/task', () => {
    //Cria uma nova tarefa
})

//PUT for task
router.put('/task/:id', () => {
    //Atualiza uma tarefa específica
})

//DELETE for task
router.delete('/task/:id', () => {
    //Deleta uma tarefa específica
})

module.exports =  router