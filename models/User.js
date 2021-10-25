const mongoose = require('mongoose');
const { isEmail } = require('validator')
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Enter Email Address'],
            validate :[isEmail,'Enter a valid Email']
        },
        password: {
            type: String,
            required: [true, 'Enter Password '],
            minlength: [6,'Minimum Length is 6']
        }
    }
)

const User = mongoose.model('user', UserSchema);

module.exports = User;