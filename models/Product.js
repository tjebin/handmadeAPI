const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide product name'],
        maxLength: [100, 'Name can not be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxLength: [1000, 'Name can not be more than 1000 characters']
    },
    image: {
        type: String,
        required: [true, 'Please provide valid image']
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: {
            values: ['home', 'dining', 'bedroom', 'living room'],
            message: '{VALUE} is not supported for category'
        }
    },
    company: {
        type: String,
        required: [true, 'Please provide product company'],
        enum: {
            values: ['Handmade', 'Handmade Pots', 'Handmade Bed & Bath', 'Handmade Mugs'],
            message: '{VALUE} is not supported for company'
        }
    },
    colors: {
        type: [String],
        required: [true, 'Please Choose Colors'],
    },

    featured: {
        type: Boolean,
        default: false
    },

    freeShipping: {
        type: Boolean,
        default: false
    },

    inventory: {
        type: Number,
        required: true,
        default: 15
    },

    averageRating: {
        type: Number,
        default: 1
    },

    stars: {
        type: Number,
        default: 1,
        required: [true, 'Please provide stars'],
        min: 1,
        max: 5
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });





module.exports = mongoose.model('Product', ProductSchema);