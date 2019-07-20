const DB = require('../helpers/Db')

exports.get = (projectId, taskId, next) => {
    var script = `SELECT * FROM tbProjetoTarefas WHERE id = ${projectId}`
    DB.con(username).query(script, (err, result, fields)=>{
        //Em caso de erro:
        //TODO
        //Coleta os resultados (TODO):
        return next(projectTask)
    })
}