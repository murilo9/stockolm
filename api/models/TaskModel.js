const DB = require('../helpers/Db')

exports.read = (username, taskId, next) => {
    var script = "SELECT * FROM tbTarefas "
    if(taskId)
        script += `WHERE id = ${taskId}`
    DB.con(username).query(script, (err, result, fields)=>{
        if(err){
            console.log(err)
            next(false)
        }
        if(taskId){     //Get specific task
            if(result){
                var task = {}
                for(key in result[i]){
                    task[key] = result[i]
                }
                next(task)
            }
            else
                next(false)
        }
        else{       //Get all tasks
            var taskList = []
            result.forEach((val, i) => {
                var task = {}
                for(key in result[i]){
                    task[key] = result[i]
                }
                taskList.push(task)
            })
            next(taskList)
        }
    })
}

exports.create = (username, task, next) => {
    //Check task object consistency:
    if(!task.title || isNaN(task.priority) || isNaN(task.status)){
        next(false)
    }
    else{
        //Get task object variables:
        var name = task.title
        var details = task.details ? task.details : ''
        var startDateString = task.startDate ? task.startDate.getTime() : null
        var endDateString = task.endDate ? task.endDate.getTime() : null
        var startDate = startDateString ? `${startDateString.getFullYear()}-
        ${startDateString.getMonth()+1}-${startDateString.getDate()} 
        ${startDateString.getHours()}-${startDateString.getMinutes()}-
        ${startDateString.getSeconds()}` : null
        var endDate = endDateString ? `${endDateString.getFullYear()}-
        ${endDateString.getMonth()+1}-${endDateString.getDate()} 
        ${endDateString.getHours()}-${endDateString.getMinutes()}-
        ${endDateString.getSeconds()}` : null
        var priority = task.priority
        var status = task.status
        //Insert into DB:
        var script = `INSERT INTO tbTarefas(nome, detalhes, dataInicio, 
            dataFim, dataInicioString, dataFimString, prioridde, estado) 
        VALUES ('${name}', '${details}', '${startDate}', '${endDate}', 
        '${startDateString}', '${endDateString}', ${priority}, ${status})`
        DB.con(username).query(script, (err, result, fields)=>{
            if(err){
                console.log(err)
                next(false)
            }
            else{
                next(true)
            }
        })
    }
    
}