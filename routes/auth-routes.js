const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

//import the DAO that handles operation for users
const usersDao = require("../modules/users-dao");

//import required library to encrypt password
const bcrypt = require("bcrypt");
const saltRounds = 10;

//login router, if already logged in, redirect to homepage
router.get("/login", function (req, res) {
  res.locals.pageTitle = "Login";
  if (res.locals.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

//when we post to login page, check if the username and password submitted
//match a user in the database, give the user an authToken, save it in a cookie
//then redirect to "/", otherwise redirect to "/login", with a fail massage
router.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  //fetch user from database
  const user = await usersDao.fetchUser(username);

  //check if the user exist in the database, if yes, match password then direct to aother page,
  //otherwise redirect to login
  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match || password === user.password) {
      // Auth success - give that user an authToken, save the token in a cookie, and redirect to the homepage.
      const authToken = uuid();
      user.authToken = authToken;
      await usersDao.updateUser(user);
      res.cookie("authToken", authToken);
      res.locals.user = user;
      //need to modify to a page desired, just use home page for testing
      res.redirect("/");
    } else {
      res.locals.user = null;
      res.setToastMessage("Authentication failed!");
      res.redirect("./login");
    }
  } else {
    res.locals.user = null;
    res.setToastMessage("Username doesn't exist!");
    res.redirect("./login");
  }
});

// Whenever we navigate to /logout, delete the authToken cookie.
// redirect to "/login", supplying a "logged out successfully" message.
router.get("/logout", function (req, res) {
  res.clearCookie("authToken");
  res.locals.user = null;
  res.setToastMessage("Successfully logged out!");
  res.redirect("./login");
});

//Create new account
router.get("/newAccount", function (req, res) {
  res.locals.pageTitle = "New Account";
  res.render("newAccount");
});

router.post("/newAccount", async function (req, res) {
  //encrypt password submitted
  const plainPassword = req.body.password;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainPassword, salt);

  const user = {
    username: req.body.username,
    password: hash,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    dob: req.body.dob,
    description: req.body.description,
    avatar_path: req.body.avatar,
  };

  //validate if re-entered password is same as password & if account exists at point of submission
  const rePassword = req.body.rePassword;

  if (!(await checkUsernameExists(user.username))) {
    if (rePassword === plainPassword) {
      try {
        await usersDao.createUser(user);
        res.setToastMessage(
          "Account creation successful. Please login using your new credentials."
        );
        res.redirect("/login");
      } catch (err) {
        res.setToastMessage("Something went wrong!");
        res.redirect("/newAccount");
      }
    } else {
      res.setToastMessage("Password doesn't match!");
      res.redirect("/newAccount");
    }
  } else {
    res.setToastMessage("Account exists!");
    res.redirect("/newAccount");
  }
});

// Username validation
router.get("/checkUserExists", async function (req, res) {
  if (await checkUsernameExists(req.query.username)) {
    res.json({ userExists: true });
  } else {
    res.json({ userExists: false });
  }
});

async function checkUsernameExists(username) {
  const checkUser = await usersDao.fetchUser(username);
  if (typeof checkUser != "undefined") {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
