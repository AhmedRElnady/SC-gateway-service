const config = require('config'),
    cartURL = config.get('MS.cart.url');

const express = require('express');
const router = express.Router();
const apiAdapter = require('../config/api-adapter/api-adapter');
const authenticate = require('../api/middlewares/authenticate.middleware');

const cartApi = apiAdapter(cartURL);

router.get('/carts', authenticate(), (req, res) => {
    cartApi.get(req.path)
        .then(cartRes => {
            res.status(cartRes.status).json({ data: cartRes.data });
        })
        .catch(e => {

        })
});

router.get('/carts/:id', authenticate(), (req, res) => {
    cartApi.get(req.path)
        .then(cartRes => {
            res.status(cartRes.status).json({ data: cartRes.data });
        })
        .catch(e => {

        })
});

router.post('/carts/:id/items', authenticate(), (req, res) => {
    cartApi.post(req.path, req.body)
        .then(cartRes => {
            res.status(cartRes.status).json({ data: cartRes.data })
        })
})

router.delete('/carts/:cartId/items/itemId', authenticate(), (req, res) => {
    cartApi.delete(req.path)
        .then(cartRes => {
            res.status(cartRes.status).json({ data: cartRes.data })
        })
})

module.exports = router;

