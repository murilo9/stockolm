const DB = require('../helpers/Db')

exports.getAll = (username) => {
    var script = "SELECT * FROM tbProjetos"
    DB.con(username).query(script, (err, result, fields)=>{
        //Em caso de erro:
        //TODO
        //Coleta os resultados (TODO):
        return result
    })
}