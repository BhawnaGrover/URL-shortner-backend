const express = require("express");
const URL = require("../models/url")
const USER = require("../models/user")
const router = express.Router();
router.get("/" , async(req, res)=>{
    if(!req.user) return res.redirect("/login");
    const allurls = await URL.find({createdBy: req.user._id})
    const user = await USER.findById(req.user._id);
    console.log(user.name)
    res.render("home",{
        urls: allurls,
        username: user.name
    })
});

router.get("/signup", (req,res)=>{
    if(!req.user) return res.render("signup");
    res.redirect("/");
})

router.get("/login", (req,res)=>{
    if(!req.user) return res.render("login");
    res.redirect("/");
})

module.exports = router;