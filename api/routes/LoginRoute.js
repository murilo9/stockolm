const express = require('express'),
    router = express.Router(),
    HashGen = require('../helpers/HashGenerator'),
    Users = require('../middlewares/Users')

//POST for login
router.post('/login', (req, res) => {
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
    })
})

//DELETE for login
router.delete('/login', () => {

})