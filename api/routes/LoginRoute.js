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
            res.write({session: session})
            res.end()
        }
        else{
            res.status(400)
            res.end()
        }
    })
})

//DELETE for login
router.delete('/login', (req, res) => {
    console.log('DELETE em /login')
    Users(req, res, (user) => {
        if(user){   //Se o usuário é válido
            Auth(req, res, (authenticated) => {
                if(authenticated){      //Logout bem-sucedido
                    res.status(200)
                    res.end()
                }
                else{       //Bad request, embora o logout pode já ter sido realizado
                    res.status(400)
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

module.exports = router