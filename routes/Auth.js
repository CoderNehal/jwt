const Router = require('express').Router();
const { readFileSync } = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const root = require('../utils/root')
const UserModel = require('../models/User')

const handleError = (err) => {

    const errors = [];
    if (err.code === 11000) {
        errors.email = 'Duplicate email Buddy'
        return errors;
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }

    return errors;
}
const maxAge = 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'this is fookin key', ({
        expiresIn: maxAge,
    }))
}
//sign up
Router.get('/signup', (req, res) => {
    const html = readFileSync(path.join(root, 'views', 'signup.html'), 'utf-8', (err, data) => {
        return data;
    });
    res.send(html);
})

Router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    let userId = ''
    try {


        // Creating empty user object 
        let newUser = new UserModel({ name, email, password });
        await newUser.hashPass(password);

        // Save newUser object to database 
        newUser.save((err, User) => {
            if (err) {
                return res.status(400).send({
                    message: "Failed to add user."
                });
            }
            else {
                userId = User._id
                const token = createToken(userId);
                console.log(token);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                return res.status(201).json(userId)
            }
        });



    } catch (error) {
        //     const html = readFileSync(path.join(root, 'views', 'error.html'), 'utf-8', (err, data) => {
        //         return data;
        //     });
        //    console.log(error);
        //    res.status(400).send(html)
        const err = handleError(error);
        console.log(err);

    }
})

//Log in

Router.get('/login', (req, res) => {
    const html = readFileSync(path.join(root, 'views', 'Login.html'), 'utf-8', (err, data) => {
        return data;
    });
    res.send(html);
})

Router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    UserModel.findOne({ email }, async function (err, user) {

        if (user == null) {
           return res.status(400).send('User Not Fookin Found')
        }
        else {
            const isCorrect = await user.validatePassword(password);
            if (!isCorrect) {
              return  res.status(400).send('Wrong Password Buddy')
            } else {
                const token = createToken(user._id);
                console.log(token);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                return res.status(201).json(user._id)
            }
        }
    })
})
module.exports = Router;