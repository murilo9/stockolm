const express = require('express'),
    router = express.Router(),
    ProjectTask = require('../models/ProjectTaskModel')
    auth = require('../middlewares/Auth')

//GET for projectTask
router.get('/project/:projectId/task', () => {
    //Coleta todas as tarefas de um projeto
})

router.get('/project/:projectId/task/:taskId', () => {
    //Coleta uma tarefa de um projeto
})

//POST for projectTask
router.post('/project/:projectId/task', () => {
    //Cria uma nova tarefa em um projeto
})

//PUT for projectTask
router.put('/project/:projectId/task/:taskId', () => {
    //Atualiza uma tarefa em um projeto
})

//DELETE for projectTask
router.delete('/project/:projectId/task/:taskId', () => {
    //Deleta uma tarefa de um projeto
})

module.exports =  router