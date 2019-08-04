const express = require('express'),
    router = express.Router(),
    HashGen = require('../helpers/HashGenerator'),
    Users = require('../middlewares/Users'),
    Auth = require('../middlewares/Auth')

//POST for login
router.post('/login', (req, res) => {
    console.log('POST em /login')
    Users(req, res, (user) => {
        if(user){   //Se o login foi bem-sucedido
            var expireDate = new Date()
            expireDate.setMinutes(expireDate.getMinutes()+15)
            //Gera a session:
            const session = {
                hash: HashGen(32),
                expire: expireDate,
                username: req.body.username
            }
            global.appSessions.push(session)
            res.send({session: session})
            console.log('nova session criada')
            console.log('global.appSessions: '+global.appSessions)
        }
        else{
            res.status(400)
            res.end()
        }
    })
})

//DELETE for login
router.delete('/login/:user/:hash', (req, res) => {
    console.log('DELETE em /login')
    req.body.session = {
        username: req.params.user,
        hash: req.params.hash
    }
    Auth(req, res, (authenticated) => {
        if(authenticated){      //Realiza o logout
            console.log('autenticado (username e hash são válidos)')
            var i = 0
            stop = false
            console.log('buscando esta session pra deletar...')
            while(!stop && i < global.appSessions.length){
                if(global.appSessions[i].hash === req.body.session.hash 
                && global.appSessions[i].username === req.body.session.username){
                    global.appSessions.splice(i, 1)
                    stop = true
                }
                i++
            }
            if(stop){
                res.status(200)
                console.log('session deletada do array de sessions com sucesso')
            }
            else{
                res.status(500)
                console.log('a session não foi encontrada no array de sessions')
            }
            res.end()
            console.log(global.appSessions)
        }
        else{       //Bad request, embora o logout pode já ter sido realizado
            res.status(400)
            res.end()
        }
    })
})

module.exports = router