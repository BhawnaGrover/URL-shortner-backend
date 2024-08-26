require('dotenv').config();
const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");
const USER = require("../models/user");

router.get("/", async(req, res) => {
  try {
    const user = await USER.findById(req.user._id);
    
    // Pass an empty string for 'url' on the initial GET request
    res.render("image", { username: user.name, url: "" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/upload", upload.single('image'), async(req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    
    // Render the page with the uploaded image URL
    res.render("image", {
      username: req.user.name,
      url: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
    });
  }
});

module.exports = router;
