const jwt = require("jsonwebtoken");
const Lastuser = require("../src/models/user");

const checkingcondition = async (req, res, next) => {
    const token = req.cookies.jaiminwebsite
    if (token) {
        jwt.verify(token, "jaiminyouaregreat", (err, decodedtoken) => {
            if (err) {
                res.redirect("/login")
            } else {
                next()
            }
        })
    } else {
        res.redirect("/login")
    }
}

const userinfo = (req, res, next) => {
    const token = req.cookies.jaiminwebsite
    if (token) {
        jwt.verify(token, "jaiminyouaregreat", async (err, decodedtoken) => {
            if (err) {
                res.locals.user = null;
                next()
            } else {
                const user = await Lastuser.findById(decodedtoken)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()

    }
}

module.exports = { checkingcondition, userinfo }