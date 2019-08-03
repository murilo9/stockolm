const express = require('express'),
    router = express.Router(),
    Task = require('../models/TaskModel')
    auth = require('../middlewares/Auth')

//GET for task
router.get('/task', (req, res) => {
    Auth(req, res, (authenticated) => {
        if(authenticated){
            Task.read(req.body.username, undefined, (taskList) => {
                res.write(taskList)
                res.end()
            })
        }
        else{
            res.status(400)
            res.end()
        }
    })
})

router.get('/task/:id', () => {
    Auth(req, res, (authenticated) => {
        if(authenticated){
            Task.read(req.body.username, req.params.id, (task) => {
                res.write(task)
                res.end()
            })
        }
        else{
            res.status(400)
            res.end()
        }
    })
})

//POST for task
router.post('/task', () => {
    Auth(req, res, (authenticated) => {     //If session is active
        if(authenticated){
            Task.create(req.body.username, req.task, (success) => {
                if(success){
                    res.end()
                }
                else{
                    res.status(500)
                    res.end()
                }
            })
        }
        else{
            res.status(400)
            res.end()
        }
    })
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