const express = require("express")
var Devices = require('../device_schema/device_schema') // connect to device document 
var message_router = express.Router()


var {getDay} = require('./day')

var Message = require('./message_schema')

message_router.get('/update',async(req,res)=>{     // get API 
    const API_key= req.query.API;
    const message_device = req.query.mess;
    const device_ip = req.socket.remoteAddress
    var isNewdevice = false
    var count = 0
    await Devices.findOne({API_key:API_key},async (err,data)=>{
        console.log(err)
        
        if(err){
            res.json({
                status:"Error",
                message:"Error on server"
            })
        }
        if(data === null){ // can't find device => create new anonymos device and watch 
            console.log('New_device')
            isNewdevice = true
            let new_device = new Devices({
                API_key:API_key,
                device_ip:device_ip,
                count_message:1,
                mess_in_minute:0,
                is_block: false,
                time_interval: 0,
                last_message:getDay(),
                message:[{
                    message:message_device,
                    time:getDay(),
                    isProcess: false
                }]
            })
            new_device.save((err)=>{
                if(err) res.json({
                    status: 'Error in save new device',
                    mess:'Err is '+ err
                })
            })
            // save new device in device doc
        }
        else{// find and save 
            console.log("Not a new device")
            isNewdevice = false 
            count = data.count_message
            await data.updateOne({$set:{count_message:count+1 }})
            await data.updateOne({$set:{last_message:getDay()}})
            await data.updateOne({$push:{message:{
                message: message_device,
                time: getDay(),
                isProcess: false
        }}})
        console.log(getDay())
        }
        var new_mess = new Message({
            API_key: API_key,
            ip_device: req.socket.remoteAddress,
            time: getDay(),
            message: message_device,
            isProcess: false
        })
        await new_mess.save((err)=>{
            if(err) res.json({
                status: "Error in save new message",
                mess:"Error is"+err
            })
            else{
                res.json({
                    status:"Success",
                    mess:isNewdevice?1:count
                })
            }
        })
        // save message in message doc 
        
    })
    
})

module.exports = message_router