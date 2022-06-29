const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("fs");

const articlesDao = require("../modules/articles-dao.js");
const usersDao = require("../modules/users-dao.js");
const { verifyAuthenticated, loginAdminVerification } = require("../middleware/auth-middleware.js");

//import required library to encrypt password
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/profile", verifyAuthenticated, loginAdminVerification, async function (req, res) {
  res.locals.pageTitle = "My Profile";

  const user = res.locals.user;

  const myArticles = await articlesDao.fetchArticleByAuthor(user.user_id);
  res.locals.myArticles = myArticles;

  res.render("profile");
});

router.post("/updateProfile", async function (req, res) {
  //encrypt password submitted
  const plainPassword = req.body.password;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainPassword, salt);

  const updatedUser = {
    password: hash,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    dob: req.body.dob,
    description: req.body.description,
    avatar_path: req.body.avatar,
  };

  const user = res.locals.user;
  //only update updated info
  try {
    user.password = updatedUser.password;
    user.first_name = updatedUser.first_name;
    user.last_name = updatedUser.last_name;
    user.email = updatedUser.email;
    user.dob = updatedUser.dob;
    if (updatedUser.description != "") {
      user.description = updatedUser.description;
    }
    if (typeof updatedUser.avatar_path != "undefined") {
      user.avatar_path = updatedUser.avatar_path;
    }
    res.setToastMessage("Infomation updated successfully.");
    await usersDao.updateUser(user);
    res.redirect("/profile");
  } catch (err) {
    res.setToastMessage("Oops, something went wrong! Please try again.");
    res.redirect("/profile");
  }

});

//allow user to delete their own account
router.post("/deleteUser", loginAdminVerification, async function (req, res) {
  if (typeof req.query.id != "undefined" && res.locals.admin) {
    await usersDao.deleteUser(req.query.id);
    res.setToastMessage("User deleted!");
    res.redirect("/admin");
  } else {
    await usersDao.deleteUser(res.locals.user.user_id);
    res.setToastMessage("User deleted!");
    res.redirect("/login");
  }
});

//allow user to edit their existing articles
router.get("/editArticle", loginAdminVerification, async function (req, res) {
  res.locals.pageTitle = "Edit Article";

  res.locals.thisArticle = await articlesDao.fetchArticle(req.query.id);
  res.render("editArticle");
});

//post edited article to database
router.post("/updateArticle", upload.single("imageFile"), async function (req, res) {
  //Allow update article without updating the image
  const updatedArticle = {
    title: req.body.articleTitle,
    content: req.body.articleBody,
  };

  //check if an image has been uploaded
  const fileInfo = req.file;

  // if image uploaded, move the image into the images folder and rename
  if (fileInfo) {
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/${fileInfo.originalname}`;
    const imageFileName = `./images/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);

    updatedArticle.image_id = imageFileName;
  }

  const article = await articlesDao.fetchArticle(req.body.articleId);

  //Update article with new image if uploaded or existing image
  try {
    article.title = updatedArticle.title;
    article.content = updatedArticle.content;
    article.image_id = updatedArticle.image_id || article.image_id;

    await articlesDao.updateArticle(article);
    res.setToastMessage("Article updated successfully.");
    res.redirect("/profile");
  } catch (err) {
    res.setToastMessage("Oops, something went wrong! Please try again.");
    res.redirect("/profile");
  }
});

//allow user delete their own articles
router.get("/deleteMyArticle", verifyAuthenticated, async function (req, res) {
  const articleId = req.query.id;
  const article = await articlesDao.fetchArticle(articleId);

  //verify if the user is the author
  if (article.user_id == res.locals.user.user_id) {
    await articlesDao.deleteArticle(articleId);
    res.setToastMessage("Article deleted!");
    res.redirect("/profile");
  } else {
    res.setToastMessage("You can't delete that article, it's not yours.");
    res.redirect("/profile");
  }
});

module.exports = router;
