let User = require('../Model/user.js')
const bodyParser = require('body-parser')
let S = require('../sever.js')
var name = ''
var arr = []
var arr1 = []
// Set Body-Parser
S.app.use(bodyParser.json())
S.app.use(bodyParser.urlencoded({extended:false}))


exports.main = (req,res)=>{
    res.render('main.ejs')
}
exports.signup = (req,res) => {
    res.render('form.ejs')
}
exports.add = (req,res) => {
    console.log(req.body)
    const User1 = new User({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })
    User1.save((err,result)=>{
      if(err){console.log(err)}
      else{ console.log(result)
            res.redirect('/signup')
           }
    })
 }
 exports.login = (req,res) => {
      name = req.body.username
     User.find({username : req.body.username},(err,result) => {
         if(err){
             console.log(err)
         }
         else{
             console.log(result)
              for(i = 0 ; i < result.length ; i++){
                  if(result[i].username == req.body.username && result[i].password == req.body.password){
                      res.render('Chat.ejs',{
                          name : req.body.username
                      })
                 }
                 
              }
         }
     })
 }
 S.io.on('connection', function(socket){
     arr.push({name : name,ID : socket.id})
     arr1[name] = socket;
    socket.on('chat',(data,callback)=>{
        arr1['Asad'].volatile.emit('chat', data);
        var resdata = "ok"
        callback(resdata)
    })
    
    console.log(arr)
    socket.on('disconnect', function(){
        for( i = 0; i < arr.length ; i++){
            if(arr[i].ID == socket.id){
                arr.splice(i,1)
            }
        }
      console.log('user disconnected');
    });
  });