const Router = require('express').Router();
const { readFileSync } = require('fs');
const path = require('path');
const root = require('../utils/root')

const handleError = (err) => {
 
    const errors = [];
    if(err.code === 11000){
        errors.email= 'Duplicate email Buddy'
        return errors;
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]=properties.message
        });
    }

    return errors;
}
const UserModel = require('../models/User')
Router.get('/signup', (req, res) => {
    const html = readFileSync(path.join(root, 'views', 'signup.html'), 'utf-8', (err, data) => {
        return data;
    });
    res.send(html);
})

Router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const User = await UserModel.create({ name, email, password });
        res.status(201).json(User)

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

module.exports = Router;