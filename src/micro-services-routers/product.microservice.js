const config = require('config'),
    productURL = config.get('MS.product.url');

const express = require('express');
const router = express.Router();
const apiAdapter = require('../config/api-adapter/api-adapter');
const authenticate = require('../api/middlewares/authenticate.middleware');

const productApi = apiAdapter(productURL);

/* 
    This route does not have any kind of authentication or authorization rules
    any body can list products.
*/
router.get('/products', (req, res) => {
    productApi.get(req.path)
        .then(productRes => {
            res.status(productRes.status).json({ data: productRes.data })
        })
        .catch(err => {
        })
});

/* 
    This route does not have any kind of authentication or authorization rules
    any body can show a specific product.
*/
router.get('/products/:id', (req, res) => {
    productApi.get(req.path)
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

