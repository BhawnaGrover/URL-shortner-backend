const express = require("express");
const path = require("path") //builtin
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRouter = require('./routes/staticRouter')
const URL = require("./models/url");

const app = express();
const PORT = 3000;

connectToMongoDB("mongodb+srv://bhawna16dav:bhawna@cluster0.qajaj5w.mongodb.net/").then(() =>
  console.log("mongoDB connected")
);

app.set("view engine" , "ejs");
app.set('views' , path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url", urlRoute);
app.use("/", staticRouter)


{/* <html>
      <head></head>
      <body>
        <ol>
          ${allURLs.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}
        </ol>
      </body>
    </html> */}


app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


