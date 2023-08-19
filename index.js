const express = require('express');
require('dotenv').config()
const app = express();
const port = 5000;
const bodyParser = require('body-parser')
var DB_URL =process.env.MONGO_URL
console.log(DB_URL)
var message_router = require('./message_schema/messsage_router');
var device_router = require('./device_schema/device_router')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())

app.use('/api/message',message_router)
app.use('/api/device',device_router)
app.get('/',(req,res)=>{
    res.send("Hello World");
})

const mongose = require('mongoose')
mongose.Promise = global.Promise
mongose.connect(DB_URL,).then(
    ()=>{
        console.log('Connect DB successfully')
        app.listen(port, ()=>{
            console.log("app is running on port: "+ port);
        })
    }
)
