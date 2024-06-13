const User = require("../models/user");
const {setUser} = require("../service/auth")

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if (!user) {
    return res.render("login", {
      error: "Invalid username or password",
    });
  }
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}
async function handleUserLogout(req, res) {
  res.clearCookie("uid");
  return res.redirect("/login");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
};
