const express = require("express");
const path = require("path") //builtin function with express
const cookieParser = require("cookie-parser")
const { connectToMongoDB } = require("./connect");
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth")
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const qrgenerateRouter = require('./routes/qrgenerate');
const image = require('./routes/image');

const app = express();
const PORT = 3000;

connectToMongoDB("mongodb+srv://bhawna16dav:bhawna@cluster0.qajaj5w.mongodb.net/").then(() =>
  console.log("mongoDB connected")
);
// connectToMongoDB("mongodb://127.0.0.1:27017/test").then(() =>
//   console.log("mongoDB connected")
// );

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine" , "ejs");
app.set('views' , path.resolve("./views"))
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRouter)
app.use("/qrgenerate", qrgenerateRouter);
app.use("/image", image);

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


