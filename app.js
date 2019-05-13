const express = require ('express');
const morgan = require('morgan');
const knex = require('knex');

// const db = knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       user: "postgres",
//       password: "test",
//       id : '',
//       name : '',
//       email : '',
//       database : 'robots'
//     }
//   });

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

 
const app = express()
app.use(morgan('short' ))


app.get("/", (req, res) => {
    db.select('*').from('users').then(data=> {
        res.send(data);
    });
})

app.get("/users", (req, res) => {
    db.select('*').from('users').then(data=> {
        res.send(data);
    });
    // res.send("Nodemon auto updates when I save this file")
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
