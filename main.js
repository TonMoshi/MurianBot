
const express = require("express");
const app = express();

var bodyParser = require('body-parser')

var router = require('./router/monhun.js');

const discord = require('./controller/discord.js')

discord.start();

var port = 8080;

app.use(bodyParser.json());
app.use('/discord', router)

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});
