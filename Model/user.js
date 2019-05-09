const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    username : String,
    email : String,
    password : String 
})
const User = mongoose.model('User',Schema)
module.exports = User ;