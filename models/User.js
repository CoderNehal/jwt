const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
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
            validate: [isEmail, 'Enter a valid Email']
        },
        password: {
            type: String,
            required: [true, 'Enter Password '],
            minlength: [6, 'Minimum Length is 6']
        },

        salt: ''
    }
)

//working thing
// UserSchema.pre('save', async function () {
//     this.salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, this.salt);
// })

UserSchema.methods.hashPass = async function (password) {

    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, this.salt);

}

UserSchema.methods.validatePassword = async function (password, cb) {
   return await bcrypt.compare(password, this.password).then(res => {
        console.log('What the F', res)
        return res
    })
}
const User = mongoose.model('user', UserSchema);

module.exports = User;