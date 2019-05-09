const express = require ('express');
const morgan = require('morgan');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user: "postgres",
      password: "test",
      id : '',
      name : '',
      email : '',
      database : 'robots'
    }
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
