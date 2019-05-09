const express = require("express")
const mongoose = require("mongoose")
const mongodb = require("mongodb")
const bodyparser = require("body-parser")
const path = require("path")
const ejs = require("ejs")
const axios = require('axios')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server);
exports.app = app;
exports.server = server;
exports.io = io;
//Set app in Route
require('./Route/route.js')(app)
//Set BodyParser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

//Set Public 
app.set(express.static(path.join(__dirname,"public")))

// Set view engine
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

// Set Mongoose
mongoose.connect("mongodb://localhost:27017/Private",{useNewUrlParser : true})
let db = mongoose.connection;
db.on("error",(err)=>{
   if(err) {console.log(err)}
})
db.once("open",()=>{
    console.log("Database Connected Successfully")
})

// app.post('/add',(req,res)=>{
//   console.log(req.body)
// })

server.listen(3000,()=>{
    console.log("Server Started")
})