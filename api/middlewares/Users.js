const user = require('../models/UserModel')

/**
 * 
 */

module.exports = (req, res, next) => {
    if(req.body.username && req.body.password){
        let username = req.body.username
        let password = req.body.password
        user.get(username, password, (user) =>{
            if(user){   //Se o usuário existe
                next(true)
            }
            else{
                res.status(400)
                res.write('Usuário ou senha inváidos')
                res.end()
            }
        })
    }
    else{
        res.status(400)
        res.write('Usuário ou senha inváidos')
        res.end()
    }
}