const express = require('express')
const mysql = require ('mysql2');

const mysqlConfig = {
    host: "mysql_server",
    user: "root",
    password: "root",
    database: "mysql_db"
}

let con = null

const app = express()

app.get ('/', function (req,res){
    res.send('Test sentence put /insert or /fetch to the address bar to do what it is named and please don t refresh too much this page.')
    con = mysql.createConnection(mysqlConfig)
    con.connec(function(err){
        if (err) throw err
        res.send('Connected to the database')
    });
    con.connect(function(err) {
        if (err) throw err;
        const sql = `
        CREATE TABLE IF NOT EXISTS numbers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          number INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )  ENGINE=INNODB;
      `;
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send("numbers table created");
        });
      });
})

app.get('/insert', function (req, res) {
    const number = Math.round(Math.random() * 100)
    con.connect(function(err) {
      if (err) throw err;
      const sql = `INSERT INTO numbers (number) VALUES (${number})`
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(`${number} inserted into table`)
      });
    })
})

app.get('/fetch', function (req, res) {
    con.connect(function(err) {
      if (err) throw err;
      const sql = `SELECT * FROM numbers`
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result))
      });
    });
  })
  