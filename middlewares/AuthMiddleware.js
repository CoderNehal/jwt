const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log('Fookin error:', err);
                res.redirect('/login')

            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}