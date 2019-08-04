const checkSession = (userSession) => {
    var now = new Date()
    var stop = false
    var i = 0
    while(i < global.appSessions.length && !stop){
        var session = global.appSessions[i]
        if(session.hash === userSession.hash && 
        session.username === userSession.username){
            if(session.expire.getTime() > now.getTime()){   //Session existe e não expirou
                stop = true
                return true
            }
            else{   //Session existe mas já expirou:
                global.appSessions.splice(i, 1)     //Apaga a session do array global
                stop = true
                return false
            }
        }
        else
            i++
    }
    return false
}

/**
 * Tranforma um hash válido em um req.session
 */
module.exports = (req, res, next) => {
    console.log('middelware Auth')
    console.log('req.body: '+req.body)
    if(req.body.session.hash && req.body.session.username){
        next(checkSession(req.body.session))    //Returns boolean
    }
    else
        next(false)
}