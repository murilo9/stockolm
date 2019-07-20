const DB = require('../helpers/Db')

exports.get = (projectId, next) => {
    var script = "SELECT * FROM tbProjetos"
    DB.con(username).query(script, (err, result, fields)=>{
        //Em caso de erro:
        //TODO
        //Coleta os resultados (TODO):
        next(project)
    })
}