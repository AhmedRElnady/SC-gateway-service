const jwt = require('jsonwebtoken');
const config = require('config');
const tokenSecret = config.get('token.secret');

function authenticate() {
    return (req, res, next) => {
        (async () => {
            console.log(">>>> authenicated user >>>>>");
        })()
    }
}

module.exports = authenticate;

