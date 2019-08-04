const DB = require('../helpers/Db')

exports.get = (username, password, next) => {
    var script = `SELECT * FROM tbUsuarios WHERE username = '${username}'`
    DB.con('system').query(script, (err, result, fields)=>{
        if(err){
            next(false)
        }
        if(result[0].senha == password)
            next(true)
        else
            next(false)
    })
}

exports.post = (username, password, next) => {
    var script = `INSERT INTO tbUsuarios(username, senha) 
    VALUES ('${username}', '${password}')`
    DB.con('system').query(script, (err, result, fields)=>{
        if(err) next(false)
        else return next(true)
        //Pouca coisa pra terminar este
    })
}

exports.update = (username, password) => {
    var script = `UPDATE tbUsuarios SET username = '${username}', senha = '${password}'`
    DB.con('system').query(script, (err, result, fields)=>{
        if(err) next(false)
        else next(true)
    })
}

exports.delete = () => {
    var script = `DELETE FROM tbUsuarios(username, senha) 
    VALUES ('${username}', '${password}')`
    DB.con('system').query(script, (err, result, fields)=>{
        if(err) next(false)
        else next(true)
    })
}