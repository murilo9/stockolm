const express = require('express'),
    router = express.Router(),
    Task = require('../models/TaskModel'),
    Auth = require('../middlewares/Auth')

//GET for task
router.get('/task/:user', (req, res) => {
    console.log('GET em /task')
    Task.read(req.params.user, undefined, (taskList) => {
        res.send({taskList: taskList})
    })
})

router.get('/task/:user/:id', () => {
    Task.read(req.params.user, req.params.id, (task) => {
        res.send(task)
    })
})

//POST for task
router.post('/task/:user', (req, res) => {
    Auth(req, res, (authenticated) => {     //If session is active
        if(authenticated){
            Task.create(req.params.user, req.task, (success) => {
                if(success){
                    res.end()
                }
                else{
                    res.status(500).send()
                }
            })
        }
        else{
            res.status(400).send()
        }
    })
})

//PUT for task
router.put('/task/:user/:id', (req, res) => {
    Auth(req, res, (authenticated) => {     //If session is active
        if(authenticated){
            if(isNaN(req.params.id)){
                res.status(400).send('invalid_id')
            }
            else{
                Task.update(req.params.user, req.body.task, req.params.id, (updated) =>{
                    if(updated){
                        res.end()
                    }
                    else{
                        res.status(500).send()
                    }
                })
            }
        }
        else{
            res.status(400).send('bad_session')
        }
    })
})

//DELETE for task
router.delete('/task/:id', (req, res) => {
    Auth(req, res, (authenticated) => {     //If session is active
        if(authenticated){
            if(isNaN(req.params.id)){
                res.status(400).send('invalid_id')
            }
            else{
                Task.delete(req.body.username, req.params.id, (deleted) =>{
                    if(deleted){
                        res.end()
                    }
                    else{
                        res.status(500).send()
                    }
                })
            }
        }
        else{
            res.status(400).send('bad_session')
        }
    })
})

module.exports =  router