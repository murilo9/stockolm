const express = require('express'),
    router = express.Router(),
    Project = require('../models/ProjectModel')
    auth = require('../middlewares/Auth')

//GET for project
router.get('/project', () => {
    //Coleta todos os projetos
})

router.get('/project/:id', () => {
    //Coleta um projeto específico
})

//POST for project
router.post('/project', () => {
    //Cria um novo projeto
})

//PUT for project
router.put('/project/:id', () => {
    //Atualiza um projeto específico
})

//DELETE for project
router.delete('/project/:id', () => {
    //Deleta um projeto específico
})

module.exports =  router