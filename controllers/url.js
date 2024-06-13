const shortid = require("shortid");
const URL = require("../models/url");
const router = require("../routes/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
async function handleDeleteURL(req, res) {
  try {
    const result = await URL.findOneAndDelete({ shortId: req.params.shortId });
    if (!result) {
      return res.status(404).json({ message: "URL not found" });
    }
    console.log("Deleted");
    // res.status(200).json({ message: "Deleted" });
    res.status(200).redirect('/');
  } catch (err) {
    console.log("Something went wrong while deleting URL", err);
    res.status(500).json({ message: "Failed to delete URL", error: err.message });
  }
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteURL,
};
