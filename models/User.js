const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: function(name) {
            if(name.length < 5) {
              new Error('Username is too short')
            }
          }

    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,

    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,    
    },
    timestamps: true,

})

const User = mongoose.model("User", userSchema);
module.exports = User;