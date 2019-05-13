const express = require ('express');
const morgan = require('morgan');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgres://adoplqaewkoxbx:a599136b9b7ea88af2d60b9b833db005c8dfb498d30fa34d849351761559354b@ec2-174-129-240-67.compute-1.amazonaws.com:5432/d7qbl21744src0',
      user: "postgres",
      password: "test",
      id : '',
      name : '',
      email : '',
      database : 'robots'
    }
  });

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


app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
});

