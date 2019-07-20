const DB = require('../helpers/Db')

exports.get = (taskProject, taskId, next) => {
    var script = "SELECT * FROM tbTarefas"
    DB.con(username).query(script, (err, result, fields)=>{
        //Em caso de erro:
        //TODO
        //Coleta os resultados (TODO):
        next(task)
    })
}