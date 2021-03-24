const postRoute = require('express').Router();
const verify = require('../verifyToken');

postRoute.get("/", verify,  (req, res) => {
    res.json({
        posts:{
            title: "The awesome title",
            description: "This is protected routes"
        }
    })
})

module.exports = postRoute;