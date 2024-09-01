const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    profilePic: String
});

module.exports = mongoose.model('user',userSchema); 