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
                    name: results[0].nome,
                    description: results[0].detalhes,
                    startDate: results[0].dataInicio ? new Date(results[0].dataInicio) : null,
                    endDate: results[0].dataFim ? new Date(results[0].dataFim) : null,
                    hasStartTime: results[0].possuiHoraInicio,
                    hasEndTime: results[0].possuiHoraFim,
                    priority: results[0].prioridade,
                    state: results[0].estado
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
                    name: results[i].nome,
                    description: results[i].detalhes,
                    startDate: results[i].dataInicio ? new Date(results[i].dataInicio) : null,
                    endDate: results[i].dataFim ? new Date(results[i].dataFim) : null,
                    hasStartTime: results[i].possuiHoraInicio,
                    hasEndTime: results[i].possuiHoraFim,
                    priority: results[i].prioridade,
                    state: results[i].estado
                }
                taskList.push(task)
            })
            next(taskList)
        }
    })
}

exports.create = (username, task, next) => {
    //Check task object consistency:
    if(!task.name || isNaN(task.priority)){
        next(false)
    }
    else{
        //Get task object variables:
        console.log(task)
        var name = task.name
        var description = task.description ? task.description : ''
        var startDateString = task.startDate.enabled ? task.startDate.date : null
        var startDate = task.startDate.enabled ? new Date(startDateString) : null
        var endDateString = task.endDate.enabled ? task.endDate.date : null
        var endDate =  task.endDate.enabled ? new Date(endDateString) : null
        var startDateSQL = task.startDate.enabled ? `"${startDate.getFullYear()}-`+
            `${startDate.getMonth()+1}-${startDate.getDate()} `+
            `${startDate.getHours()}-${startDate.getMinutes()}-`+
            `${startDate.getSeconds()}"` : null
        var endDateSQL = task.endDate.enabled ? `"${endDate.getFullYear()}-`+
            `${endDate.getMonth()+1}-${endDate.getDate()} `+
            `${endDate.getHours()}-${endDate.getMinutes()}-`+
            `${endDate.getSeconds()}"` : null
            var priority = task.priority
        var hasStartTime = task.startDate.hasTime
        var hasEndTime = task.endDate.hasTime
        var status = 0
        //Insert into DB:
        var script = `INSERT INTO tbTarefas(nome, detalhes, dataInicio, dataFim, `+
            `dataInicioString, dataFimString, possuiHoraInicio, possuiHoraFim, prioridade, estado) `+
        `VALUES ("${name}", "${description}", ${startDateSQL}, ${endDateSQL}, "${startDateString}", `+
        `"${endDateString}", ${hasStartTime}, ${hasEndTime}, ${priority}, ${status})`
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

//-----------ESSA POHA TÁ ERRADA AINDA, TEM Q FAZER IGUAL A DE CIMA----------------

exports.update = (username, newTask, taskId, next) => {
    //Gets new task variables:
    var name = newTask.title ? newTask.title : null
    var description = newTask.description ? newTask.description : null
    var startDateString = newTask.startDate ? newTask.startDate.getTime() : null
    var startDate = newTask.startDate ? `"${startDate.getFullYear()}-
        ${startDate.getMonth()+1}-${startDate.getDate()} 
        ${startDate.getHours()}-${startDate.getMinutes()}-
        ${startDate.getSeconds()}"` : null
    var endDateString = newTask.endDate ? newTask.endDate.getTime() : null
    var endDate = endDateString ? `"${endDate.getFullYear()}-
        ${endDate.getMonth()+1}-${endDate.getDate()} 
        ${endDate.getHours()}-${endDate.getMinutes()}-
        ${endDate.getSeconds()}"` : null
    if(newTask.startDate !== undefined)
        var hasStartTime = newTask.startDate.hasStartTime !== undefined ? 
        newTask.startDate.hasStartTime : null
    if(newTask.endDate !== undefined)
        var hasEndTime = newTask.endDate.hasEndTime !== undefined ? 
        newTask.endDate.hasEndTime : null
    var priority = newTask.priority !== undefined ? newTask.priority : NaN
    var state = newTask.state !== undefined ? newTask.state : NaN
    //Update into DB:
    var script = "UPDATE tbTarefas SET"
    if(name) script += ` nome = "${name}",`
    if(description) script = ` detalhes = "${description}",`
    if(startDate) 
        script += ` dataInicio = ${startDate}, dataInicioString = "${startDateString}",`
    if(endDate)
        script += ` dataFim = ${endDate}, dataFimString = "${endDateString}",`
    if(hasStartTime !== undefined)
        script += ` possuiHoraInicio = ${hasStartTime},`
    if(hasEndTime !== undefined)
        script += ` possuiHoraFim = ${hasEndTime},`
    if(!isNaN(priority)) script += ` prioridade = ${priority},`
    if(!isNaN(state)) script += ` estado = ${state},`
    script = script.slice(0, -1)   //Removes last comma (it's 'sLice', not 'sPLice')
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
        var script = `DELETE FROM tbTarefas WHERE id = ${taskId}`
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