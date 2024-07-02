const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    login:String,
    role_id:String,
    departement_id:String,
    password: String,
    api_token: String,
    photo: String,
    app_name: String,
    status: String,
    
});

module.exports = mongoose.model('User', userSchema);