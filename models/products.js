const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    productImage:String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgColor: String,
    panelColor:String,
    textColor: String
});

export default mongoose.model('product',productSchema);