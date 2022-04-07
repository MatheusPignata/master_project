require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

//RECEBENDO A EXPORTAÇÃO DO CONNECTION.JS
const Connection = require('./bd/connection');
const route = require('./routes/routes');
const app = Express();

app.use(cors());
app.use(Express.json({limit:'50mb'}));
app.use(bodyparser.json({limit:'50mb'}));//aumentar tamanho do json
app.use(bodyparser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(Express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(route);

//UTILIZANDO O METODO
app.listen(process.env.APP_PORT, async ()=>{
    console.log("Servidor ON na porta", process.env.APP_PORT);
    Connection.sync();
    //Connection.populate();
})