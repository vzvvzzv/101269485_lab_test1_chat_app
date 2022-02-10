const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fromuser: {
        type: String,
        required: true,

    },
    touser: {
        type: String,
        required: true,

    },
    message: {
        type: String,
        required: true,

    },
    room: {
        type: String,
        required: true,    
    },
    timestamps: true,

})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;