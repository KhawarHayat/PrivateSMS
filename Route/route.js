let Controller = require('../Controller/control.js')
module.exports =(app)=>{
app.get('/',Controller.main)
app.get('/signup',Controller.signup)
app.post('/add',Controller.add)
app.post('/login',Controller.login)
}