/* const mongoose = require('mongoose')
const connectToMongoDB = require('./database/connection')
const express = require('express')
const app = express()

async function start(){
    const uri = await connectToMongoDB();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(3000, () => {
        console.log('Сервер запущен на порту 3000');
});
}

module.exports = start;
*/