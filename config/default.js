module.exports = {
    MS: {
        product: {
            url: "http://localhost:4000",
            prefix: "products"
        }, 
        cart: {
            url: "http://localhost:5000",
            prefix: "shopping-carts"
        }
    },
    token: {
        secret: 'elnadySecret',
        expiresIn: '7d'
    }
}