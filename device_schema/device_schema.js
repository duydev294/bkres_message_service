const mongose = require("mongoose")
var device_schema = new mongose.Schema({
    API_key:{
        type:String,
        require: true
    },
    
    device_ip:{
        type: String,
        require: true
    },
    count_message:{
        type: Number,
        require: true,
        default: 0
    },
    mess_in_minute:{
        type: Number,
        require: false,
        default: 0
    },
    is_block:{
        type: Boolean,
        require: false,
        default: false
    },
    time_interval:{
        type: Number,
        require: false
    },
    last_message:{   // time that the nearest messagse be receiv  
        type: String,
        require: true
    },
    message:[{
        message: String ,
        time: String,
        is_Process:{
            type: Boolean,
            require: true
        }
    }]
})
module.exports = mongose.model('device',device_schema)