const path = require("path")
const ejs = require("ejs")
const express = require("express")
const app = express()
require("./db/connection")
const Lastuser = require("./models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
const { checkingcondition, userinfo } = require("../middleware/middleware")

const views_path = path.join(__dirname, "/templates")
const static_path = path.join(__dirname, "../public")
// console.log(static_path);

app.set("view engine", "ejs")
app.set("views", views_path)
app.use(express.static(static_path))

//this 2 will use when you are collecting the data from the post request 
//the error will be look like can not read properties of undefined
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())

app.get("*", userinfo)
app.get("/", (req, res) => {
    res.render("home")
})
app.get("/service", checkingcondition, (req, res) => {
    res.render("service")
})
app.get("/about", checkingcondition, (req, res) => {
    res.render("about")
})
app.get("/contact", checkingcondition, (req, res) => {
    res.render("contact")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})

//ther is also the huge differeance between the res.render and res.redirect
app.post("/signup", async (req, res) => {
    let { username, email, password } = req.body
    password = await bcrypt.hash(password, 10)
    // console.log(password);
    try {
        const user = await Lastuser.create({ username, email, password })
        await user.save()
        console.log(user);

        const token = jwt.sign(user._id.toString(), "jaiminyouaregreat")
        // console.log(token);

        res.cookie("jaiminwebsite", token, { maxAge: 1000 * 60 * 60 })
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body
    // console.log(email,password);
    try {
        let user = await Lastuser.find({ email })
        // console.log(user[0].password);
        const checkingpassword = await bcrypt.compare(password, user[0].password)
        if (checkingpassword == true) {
            const token = jwt.sign(user[0].id, "jaiminyouaregreat")
            // console.log(token);

            res.cookie("jaiminwebsite", token, { maxAge: 100 * 60 * 60 })
            res.redirect("/")
        } else {
            console.log("password are wrong");
            res.send("password are wrong")
        }

    }
    catch (error) {
        console.log(error);
        res.send("you have to signin first")
    }
})


app.get("/logout", (req, res) => {
    res.cookie("jaiminwebsite", "", { maxAge: 1 })
    res.redirect("/")
})

app.listen(8800, () => {
    console.log("server is 8800");
})