const mysql = require('mysql')

exports.con = (user) => {
    return mysql.createPool({
        connectionLimit: 99,
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: user === 'system' ? 'stockolm_system' : 'stockolm_user_'+user
    })
}

