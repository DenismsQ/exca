const mongoose = require('mongoose');
const Schema = mongoose.Schema

const mainPageSchema = new Schema ({
    name: { type: String},
    about: { type: String},
    price: { type: String},
    imageUrl: { type: String}
});

module.exports = mongoose.model('MainPage', mainPageSchema, 'MainPage')