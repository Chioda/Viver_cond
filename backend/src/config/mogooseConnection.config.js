const express = require('express');
const mongoose = require('mongoose');

const database = require('./db.config');

mongoose.Promise = global.Promise;

mongoose
.connect(database.local.localDatabaseUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,     
})
.then(() => {
        console.log('Banco de dados conectado com sucesso!');       
    }, 
    (err) => {
        console.log(`Erro ao conectar com o banco de dados...: ${err}`);
        process.exit();
    }
);