const mongose = require("mongoose");
var message_schema = new mongose.Schema({
    
    API_key:{
        type: String,
        require: true
    },
    ip_device:{
        type: String,
        require: true
    },
    time:{
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    },
    isProcess:{
        type:Boolean,
        require: true
    },
})

module.exports = mongose.model('message',message_schema)