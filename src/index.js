const express = require('express')
const session=require('express-session');
const morgan = require('morgan');
const path = require('path');
const app = express()
const port = 3000
const route=require('./routes');
const db=require('./config/db/index');
const fileupload=require('express-fileupload');
const cors=require('cors');
const cookieParser=require('cookie-parser');

db.connect();
    //--------------------------------------------//
app.use(cors());
app.use(cookieParser());


    // TEMPLATE ENGINE
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileupload())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//fix getapi
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})
//session
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: {  maxAge  : new Date(Date.now() + 3600000), //1 Hour
    expires : new Date(Date.now() + 3600000),  }}));
    



console.log(__dirname)
//
//HTTP logger
//app.use(morgan('combined'));
route(app);
app.get('/',function(req,res){
res.send("hi")
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
module.exports=port;
