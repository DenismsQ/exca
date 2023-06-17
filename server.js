const express = require('express');
const mongoose = require('mongoose')
const app = express();
const path = require('path');
const routes = require('./routes/routes');

const User = require('./models/user');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

app.use('/css', express.static(__dirname + '/public/css'));

const connectToMongoBD = require('./database/connection')
const bcrypt = require('bcryptjs')

//const startServer = require('./serverStart')

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection:'sessions'
});

app.use('/css', express.static(__dirname + '/public/css'))
app.use('/img/avatars', express.static(__dirname + '/public/img/avatars'))
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({ extended:true}));

app.use(session({
    secret:'secret key',
    resave: false,
    saveUninitialized:false,
}))

app.use('/',routes);

async function start(){
    const uri = await connectToMongoBD();
    await mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});
    app.listen(3000,()=>{
        console.log('Сервер запущен на порту 3000')
    });

}

start();