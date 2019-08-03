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
    Auth(req, res, (authenticated) => {     //If session is active
        if(authenticated){
            if(isNaN(req.params.id)){
                res.write({msg: 'invalid_id'})
                res.status(400)
                res.end()
            }
            else{
                Task.update(req.body.username, req.body.task, req.params.id, (updated) =>{
                    if(updated){
                        res.end()
                    }
                    else{
                        res.status(500)
                        res.end()
                    }
                })
            }
        }
        else{
            res.write({msg: 'bad_session'})
            res.status(400)
            res.end()
        }
    })
})

//DELETE for task
router.delete('/task/:id', () => {
    Auth(req, res, (authenticated) => {     //If session is active
        if(authenticated){
            if(isNaN(req.params.id)){
                res.write({msg: 'invalid_id'})
                res.status(400)
                res.end()
            }
            else{
                Task.delete(req.body.username, req.params.id, (deleted) =>{
                    if(deleted){
                        res.end()
                    }
                    else{
                        res.status(500)
                        res.end()
                    }
                })
            }
        }
        else{
            res.write({msg: 'bad_session'})
            res.status(400)
            res.end()
        }
    })
})

module.exports =  router