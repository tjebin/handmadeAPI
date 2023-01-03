const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    gender: {
        type: String,
        default: 'Male'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    image: {
        type: String,
        required: [true, 'Please provide valid image'],
        default: '/uploads/images/diet2.jpg'
    },

});

UserSchema.pre('save', async function () {
    // console.log(" modified path -> " + this.modifiedPaths());
    // console.log(this.isModified('name'));

    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre('save', function (next) {
    if (this.gender === 'Male') {
        this.image = 'https://cdn.vectorstock.com/i/1000x1000/17/61/male-avatar-profile-picture-vector-10211761.webp';
    } else {
        this.image = 'https://www.creativefabrica.com/wp-content/uploads/2021/04/11/Woman-Avatar-Icon-Vector-Graphics-10677522-1-1-580x387.jpg';
    }

    next();
});


UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);