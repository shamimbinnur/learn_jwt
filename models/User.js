const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        min: 6,
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    data:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema);