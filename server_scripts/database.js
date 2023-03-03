const mysql = require('mysql2')
const env = require('dotenv').config()

const server = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
})

console.log('connected to mysql db')

//Searches for user in database, either creates or updates record
const updateUsers = user => {
    server.connect((error, result) => {
        if (error) throw error
        console.log('connected to sql')
        server.query(`SELECT EXISTS(SELECT * FROM users WHERE id='${user.id}');`, (error, res) => {
            if(error) throw error
            const data = res[0]
            const exists = Object.values(data)[0]
            
            if(exists == 0){
                server.query(`INSERT INTO users VALUES ('${user.id}', '${user.email}', '${user.access_token}', '${user.refresh_token}', '${user.scope}')`, error => {
                    if(error) throw error
                    console.log('inserted new user')
                })
            } else {
                server.query(`UPDATE users SET access_token = '${user.access_token}', refresh_token = '${user.refresh_token}', scope = '${user.scope}' WHERE id = '${user.id}'`, error => {
                    if(error) throw error
                    console.log('updated previous user record')
                })
            }
        })
    })
}

const getUserRecord = id => {
    server.connect(error => {
        if(error) throw error
        server.query(`SELECT * FROM users WHERE id='${id}'`, (error, result) => {
            if(error) throw error
            console.log('got user record')
            return result[0]
        })
    })
}

module.exports = {
    updateUsers,
    getUserRecord
}