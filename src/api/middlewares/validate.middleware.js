// Todo: implement 
function validate() {
    return (req, res, next) => {
        (async ()=> {
            console.log(".... valid body....")
            next();
        })()
    }
}

module.exports = validate;