const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteURL,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);
router.get("/delete/:shortId", handleDeleteURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
