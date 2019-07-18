const DB = require('../helpers/Db')

exports.getAll = (username, projectId) => {
    var script = `SELECT * FROM tbProjetoTarefas WHERE id = ${projectId}`
    DB.con(username).query(script, (err, result, fields)=>{
        //Em caso de erro:
        //TODO
        //Coleta os resultados (TODO):
        return result
    })
}