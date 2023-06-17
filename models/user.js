const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true},
    role: { type: String, enum: ['admin','user'], default: 'user' }//,
//UserDetails: { type: Schema.Tipes.ObjectId, ref: 'UserDetails'}
});

module.exports = mongoose.model('user', userSchema);