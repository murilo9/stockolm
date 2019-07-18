const DB = require('../helpers/Db')

exports.get = (username, password) => {
    var script = `SELECT * FROM tbUsuarios WHERE username = ${username}`
    DB.con('system').query(script, (err, result, fields)=>{
        //Em caso de erro:
        //TODO
        //Analisa o resultado e retorna true ou false (TODO):
        return result
    })
}

exports.post = (username, password) => {
    var script = `INSERT INTO tbUsuarios(username, senha) 
    VALUES ('${username}', '${password}')`
    DB.con('system').query(script, (err, result, fields)=>{
        if(err) return false
        else return true
        //Pouca coisa pra terminar este
    })
}

exports.update = (username, password) => {
    var script = `UPDATE tbUsuarios SET username = ${username}, senha = ${password}`
    DB.con('system').query(script, (err, result, fields)=>{
        if(err) return false
        else return true
    })
}

exports.delete = () => {
    var script = `DELETE FROM tbUsuarios(username, senha) 
    VALUES ('${username}', '${password}')`
    DB.con('system').query(script, (err, result, fields)=>{
        if(err) return false
        else return true
    })
}