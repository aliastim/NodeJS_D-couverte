let mysql = require('mysql')
let connection = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password : '',
    database : 'NODEJS_Livredor'
})

connection.connect()

module.exports = connection