const DB = require('../helpers/Db')

exports.read = (username, taskId, next) => {
    var script = "SELECT * FROM tbTarefas "
    if(taskId)
        script += `WHERE id = ${taskId}`
    DB.con(username).query(script, (err, results, fields)=>{
        if(err){
            console.log(err)
            next(false)
        }
        if(taskId){     //Get specific task
            if(results){
                var task = {
                    id: results[0].id,
                    title: results[0].nome,
                    details: results[0].detalhes,
                    startDate: results[0].dataInicio ? new Date(results[0].dataInicio) : null,
                    endDate: results[0].dataFim ? new Date(results[0].dataFim) : null,
                    priority: results[0].prioridade,
                    state: results[0].status
                }
                next(task)
            }
            else
                next(false)
        }
        else{       //Get all tasks
            var taskList = []
            results.forEach((result, i) => {
                var task = {
                    id: results[i].id,
                    title: results[i].nome,
                    details: results[i].detalhes,
                    startDate: results[i].dataInicio ? new Date(results[i].dataInicio) : null,
                    endDate: results[i].dataFim ? new Date(results[i].dataFim) : null,
                    priority: results[i].prioridade,
                    state: results[i].status
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
        var startDate = startDateString ? `${task.startDate.getFullYear()}-
            ${task.startDate.getMonth()+1}-${task.startDate.getDate()} 
            ${task.startDate.getHours()}-${task.startDate.getMinutes()}-
            ${task.startDate.getSeconds()}` : null
        var endDate = endDateString ? `${task.endDate.getFullYear()}-
            ${task.endDate.getMonth()+1}-${task.endDate.getDate()} 
            ${task.endDate.getHours()}-${task.endDate.getMinutes()}-
            ${task.endDate.getSeconds()}` : null
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

exports.update = (username, newTask, taskId, next) => {
    //Gets new task variables:
    var name = newTask.title ? newTask.title : null
    var details = newTask.description ? newTask.description : null
    var startDateString = newTask.startDate ? newTask.startDate.getTime() : null
    var startDate = newTask.startDate ? `${newTask.startDate.getFullYear()}-
        ${newTask.startDate.getMonth()+1}-${newTask.startDate.getDate()} 
        ${newTask.startDate.getHours()}-${newTask.startDate.getMinutes()}-
        ${newTask.startDate.getSeconds()}` : null
    var endDateString = newTask.endDate ? newTask.endDate.getTime() : null
    var endDate = endDateString ? `${newTask.endDate.getFullYear()}-
        ${newTask.endDate.getMonth()+1}-${newTask.endDate.getDate()} 
        ${newTask.endDate.getHours()}-${newTask.endDate.getMinutes()}-
        ${newTask.endDate.getSeconds()}` : null
    var priority = newTask.priority
    var status = newTask.status
    //Update into DB:
    var script = "UPDATE tbTarefas SET "
    if(name) script += `nome = '${name}'`
    if(details) script = `, detalhes = '${details}'`
    if(startDate) 
        script += `, dataInicio = '${startDate}', dataInicioString = '${startDateString}'`
    if(endDate)
        script += `, dataFim = '${endDate}', dataFimString = '${endDateString}'`
    if(priority) script += `, prioridade = ${priority}`
    if(status) script += `, status = ${status}`
    script += ` WHERE id = ${taskId}`
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

exports.delete = (username, taskId, next) => {
    if(taskId === undefined){   //Delete all tasks
        var script = "DELETE FROM tbTarefas"
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
    else if(isNaN(taskId)){
        next(false)
    }
    else{   //Delete specific task
        var script = `DELETE FROM tbTarefas WHERE id = ${task}`
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