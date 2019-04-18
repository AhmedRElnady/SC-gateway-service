const config = require('config'),
    productURL = config.get('MS.product.url');

const express = require('express');
const router = express.Router();
const apiAdapter = require('../config/api-adapter/api-adapter');
const authenticate = require('../api/middlewares/authenticate.middleware');

const productApi = apiAdapter(productURL);

router.get('/products', authenticate(), (req, res) => {
    productApi.get(req.path, { headers: { "x-payload-header": JSON.stringify(req.tokenPayload) } })
        .then(productRes => {
            res.status(productRes.status).json({ data: productRes.data })
        })
        .catch(err => {

        })
})

router.post('/products', authenticate(), (req, res) => {
    productApi.post(req.path, req.body, { headers: { "x-payload-header": JSON.stringify(req.tokenPayload) } })
        .then(productRes => {
            res.status(productRes.status).send(productRes.data);
        })
        .catch(err => {

        })
})

router.get('/products/:id', authenticate(), (req, res) => {
    productApi.get(req.path, { headers: { "x-payload-header": JSON.stringify(req.tokenPayload) } })
        .then(productRes => {
            res.status(productRes.status).json({ data: productRes.data })
        })
        .catch(err => {

        })
})

router.patch('/products/:id', authenticate(), (req, res) => {
    productApi.patch(req.path, req.body, { headers: { "x-payload-header": JSON.stringify(req.tokenPayload) } })
        .then(productRes => {
            res.status(productRes.status).json({ data: productRes.data })
        })
        .catch(err => {

        })
})

router.delete('/products/:id', authenticate(), (req, res) => {
    productApi.delete(req.path, { headers: { "x-payload-header": JSON.stringify(req.tokenPayload) } })
        .then(productRes => {
            res.status(productRes.status).json({ data: productRes.data })
        })
});

module.exports = router;

