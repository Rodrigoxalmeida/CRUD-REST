// config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//forma de ler json / middlewares - recursos que são executados entre as requisições de resposta 
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

//rotas da API
const indexRoutes = require('./routes/indexRoutes');
const personRoutes = require('./routes/personRoutes');

app.use('/',indexRoutes);
app.use('/person', personRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

//entregar uma porta
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterapi.1orpr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(()=>{
    console.log('Aplicação conectada ao MongoDB');
    console.log('Servidor Rodando na Porta 3000');
    app.listen(3000);
})
.catch(err => console.log(err));



//