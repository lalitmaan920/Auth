const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: false
    }
}, {
    timestamps: true
});

const ProductModel = mongoose.model('products', ProductSchema);
module.exports= ProductModel;