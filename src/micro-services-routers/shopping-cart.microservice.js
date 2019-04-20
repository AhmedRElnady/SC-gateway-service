const config = require('config'),
    cartURL = config.get('MS.cart.url');

const express = require('express');
const router = express.Router();
const apiAdapter = require('../config/api-adapter/api-adapter');
const authenticate = require('../api/middlewares/authenticate.middleware');

const cartApi = apiAdapter(cartURL);

router.get('/shopping-carts', authenticate(), (req, res) => {
    cartApi.get(req.path, { headers: { "x-payload-header": JSON.stringify(req.tokenPayload) } })
        .then(cartRes => {
            res.status(cartRes.status).json({ data: cartRes.data });
        })
        .catch(e => {

        })
});

router.get('/shopping-carts/:cartId', authenticate(), (req, res) => {
    cartApi.get(req.path, { headers: { "x-payload-header": JSON.stringify(req.tokenPayload) } })
        .then(cartRes => {
            res.status(cartRes.status).json({ data: cartRes.data });
        })
        .catch(e => {

        })
});

router.post('/shopping-carts/:cartId/items/:itemId', authenticate(), (req, res) => {
    console.log(">#######", req.tokenPayload);

    cartApi.post(req.path, req.body, { headers: { "x-payload-header": JSON.stringify(req.tokenPayload) } })
        .then(cartRes => {
            res.status(cartRes.status).json({ data: cartRes.data })
        })
})

router.delete('/shopping-carts/:cartId/items/:itemId', authenticate(), (req, res) => {
    cartApi.delete(req.path, { headers: { "x-payload-header": JSON.stringify(req.tokenPayload) } })
        .then(cartRes => {
            res.status(cartRes.status).json({ data: cartRes.data })
        })
})

module.exports = router;


