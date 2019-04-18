const express = require('express');
const router = express.Router();
const apiAdapter = require('../../config/api-adapter/api-adapter');
const User = require('../../models/users.model');
const validate = require('../middlewares/validate.middleware');
const jwt = require('../../utils/jwt.util');
const bcrypt = require('../../utils/bcrypt.util');
const config = require('config');

router.post('/signup', validate(), async(req, res, next)=> {

});

router.post('/login', validate(), async(req, res, next) => {

});

module.exports = router;

