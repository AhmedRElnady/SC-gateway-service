const express = require('express');
const router = express.Router();

const productRoutes = require('./product.microservice');
const shoppingCartRoutes = require('./shopping-cart.microservice');


router.use((req, res, next) => {
    console.log(`##### calling: "${req.path}" path ... ####`);
    next();
});

router.use(productRoutes);
router.use(shoppingCartRoutes);

module.exports = router;
