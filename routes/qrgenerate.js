const express = require("express");
const QRcode = require("qrcode");
const router = express.Router();
const USER = require("../models/user");

router.get("/", async(req, res) => {
  const user = await USER.findById(req.user._id);
  res.render("qrgenerate",{username: user.name, qrCodeData: null, url: null});
});

router.post("/generate", async(req, res) => {
  const url = req.body.url;
  const user = await USER.findById(req.user._id);
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const qrCodeData = await QRcode.toDataURL(url);
    res.render("qrgenerate", { username: user.name,qrCodeData, url });
  } catch (err) {
    res.status(500).send('Failed to generate QR code');
  }

});

module.exports = router;
