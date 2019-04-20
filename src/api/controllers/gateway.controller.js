const express = require('express');
const router = express.Router();
const apiAdapter = require('../../config/api-adapter/api-adapter');
const User = require('../../models/users.model');
const validate = require('../middlewares/validate.middleware');
const jwt = require('../../utils/jwt.util');
const bcrypt = require('../../utils/bcrypt.util');
const config = require('config');

router.post('/signup', validate(), async (req, res, next) => {
    try {
        const createdUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hashPassword(req.body.password),
            role: req.body.role
        });

        return res.status(201).json({
            msg: 'A new user is created successfully.',
            data: createdUser
        });
    } catch (e) {
        next(e);
    }
});

router.post('/login', validate(), async (req, res, next) => {
    try {
        let _apiAdapter,
            MSURL = config.get('MS.cart.url'),
            MSPrefix = config.get('MS.cart.prefix'),
            userId, userRole, cartId;

        const user = await User.findOne({ email: req.body.email });

        if (!user)
            return res.status(200).json({ success: false, message: 'Incorrect login credentials.' }); // 404

        if (! await bcrypt.isValidPassword(req.body.password, user.password))
            return res.status(200).json({ success: false, message: 'Incorrect login credentials.' });

        userId = user._id;
        userRole = user.role;

        // create a cart to the authenticated user(customer), if he does not already have a pending shopping cart
        if (userRole === 'CUSTOMER') {
            _apiAdapter = apiAdapter(MSURL);

            const cartRes = await _apiAdapter.post(`/${MSPrefix}/`, { userId: user._id })
            cartId = cartRes.data.data; // refactor
        }

        const payload = await _setTokenPayload(userId, userRole, cartId);
        const token = await jwt.signToken(payload);

        res.status(200).json({
            success: true,
            msg: 'logged in successfully, welcome',
            // data to be stored in the local storage in the client-side.
            data: { 'userId': userId, 'name': user.name, 'email': user.email, 'role': userRole, 'cartId': cartId },
            token
        })
    } catch (e) {

    }

})

const _setTokenPayload = (GWUserID, userRole, userDetails) => {
    return new Promise((resolve, reject) => {
        let payload = {
            id: GWUserID,
            role: userRole
        }

        if (userRole === 'CUSTOMER')
            payload.cartId = userDetails // ToDo: refactor

        resolve(payload);
    })
}

module.exports = router;

