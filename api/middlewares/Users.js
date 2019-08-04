const user = require('../models/UserModel')

/**
 * 
 */

module.exports = (req, res, next) => {
    console.log(req.body)
    if(req.body.username && req.body.password){
        let username = req.body.username
        let password = req.body.password
        user.get(username, password, (user) =>{
            if(user){   //Se o usuário existe
                next(true)
            }
            else{
                next(false)
            }
        })
    }
    else{
        next(false)
    }
}