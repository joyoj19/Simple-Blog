const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("fs");

const { loginAdminVerification } = require("../middleware/auth-middleware.js");

const articlesDao = require("../modules/articles-dao.js");
const usersDao = require("../modules/users-dao.js");
const searchDao = require("../modules/search-dao.js");
const likesDao = require("../modules/likes-dao.js");
const commentsDao = require("../modules/comments-dao.js");

router.get("/", loginAdminVerification, async function (req, res) {
  res.locals.pageTitle = "Home Page";

  const allArticles = await articlesDao.fetchAllArticles();
  for (let i = 0; i < allArticles.length; i++) {
    const likedUsers = await likesDao.fetchLikedUsers(allArticles[i].article_id);
    const likesNum = likedUsers.length;
    allArticles[i].likes_count = likesNum;
    await articlesDao.updateLikes(allArticles[i]);
    await articlesDao.articleCommentCount(allArticles[i]);
  }

  res.locals.allArticles = await articlesDao.fetchAllArticles();
  res.render("home");
});

router.get("/user", loginAdminVerification, async function (req, res) {
  res.locals.usersArticles = await articlesDao.fetchArticleByAuthor(req.query.id);
  const user = await usersDao.fetchUserById(req.query.id);
  res.locals.user_id = req.query.id;
  res.locals.first_name = user.first_name;
  res.locals.last_name = user.last_name;
  res.locals.description = user.description;
  res.locals.avatar_path = user.avatar_path;
  res.locals.pageTitle = `Articles by ${res.locals.first_name} ${res.locals.last_name}`;
  res.render("user");
});

router.get("/admin", loginAdminVerification, async function (req, res) {
  res.locals.pageTitle = "Admin";

  if (typeof res.locals.user != "undefined" && res.locals.user.is_admin) {
    res.locals.admin = true;
    res.locals.allArticles = await articlesDao.fetchAllArticles();
    res.locals.allUsers = await usersDao.fetchAllUsers();

    res.render("admin");
  } else {
    res.redirect("/");
  }
});

router.post("/deleteArticle", loginAdminVerification, async function (req, res) {
  await articlesDao.deleteArticle(req.query.id);
  res.setToastMessage("Article deleted!");
  res.redirect("admin");
});

router.get("/deleteComment", loginAdminVerification, async function (req, res) {
  const currentArticleId = await articlesDao.fetchArticleIdByCommentId(req.query.id);
  await commentsDao.deleteComment(req.query.id);
  res.setToastMessage("Comment deleted!");
  res.redirect(`/article?id=${currentArticleId.article_id}`);
});

router.get("/newArticle", loginAdminVerification, async function (req, res) {
  res.locals.pageTitle = "New Article";
  res.render("newArticle");
});

router.get("/article", loginAdminVerification, async function (req, res) {
  const article = await articlesDao.fetchArticle(req.query.id);

  await articlesDao.updateViews(article);
  const likedUsers = await likesDao.fetchLikedUsers(article.article_id);
  const likesNum = likedUsers.length;
  article.likes_count = likesNum;
  await articlesDao.updateLikes(article.article_id);

  res.locals.title = article.title;
  res.locals.pageTitle = article.title;
  res.locals.content = article.content;
  res.locals.image_id = article.image_id;
  res.locals.author_id = article.user_id;
  res.locals.date = article.date_published;
  res.locals.views = article.view_count;
  res.locals.likes = article.likes_count;
  res.locals.article_id = article.article_id;

  const author = await usersDao.fetchUserById(article.user_id);
  res.locals.author_avatar = author.avatar_path;
  res.locals.first_name = author.first_name;
  res.locals.last_name = author.last_name;

  //check if this user liked this article
  if (typeof res.locals.user != "undefined") {
    const likedArticles = await likesDao.fetchLikedArticles(res.locals.user.user_id);
    const thisArticleId = article.article_id;

    function contains(a, id) {
      for (let i = 0; i < a.length; i++) {
        if (a[i].article_id === id) {
          return true;
        }
      }
      return false;
    }

    if (contains(likedArticles, thisArticleId)) {
      res.locals.liked = true;
    }
  }

  const allComments = await articlesDao.fetchCommentsFromAticle(req.query.id);

  let comments = [];

  if (allComments.length > 0) {
    allComments.forEach((element) => {
      if (!element.parent_comment_id) {
        comments.push(element);
      }
    });

    for (let i = 0; i < comments.length; i++) {
      comments[i].subComments = [];
    }

    comments.forEach((top) => {
      allComments.forEach((sub) => {
        if (sub.parent_comment_id === top.comment_id) {
          top.subComments.push(sub);
        }
      });
    });

    res.locals.comments = comments;
  }

  res.render("article");
});

router.post("/newArticle", upload.single("imageFile"), async function (req, res) {
  // When we POST to /edit, accept the image upload, and move it to the images folder.

  const fileInfo = req.file;

  // Move the image into the images folder
  const oldFileName = fileInfo.path;
  const newFileName = `./public/images/${fileInfo.originalname}`;
  const imageFileName = `./images/${fileInfo.originalname}`;
  fs.renameSync(oldFileName, newFileName);

  const article = {
    title: req.body.articleTitle, //need to add to edit.handlebars
    content: req.body.articleBody,
    image_id: imageFileName,
    author_id: res.locals.user.user_id,
  };

  try {
    await articlesDao.createArticle(article);
    res.setToastMessage("Article creation successful.");
    res.redirect(`/article?id=${article.article_id}`);
  } catch (err) {
    res.setToastMessage("Unable to create article");
    res.redirect("/newArticle");
  }
});

router.post("/newComment", async function (req, res) {
  const content = req.body.comment;
  await commentsDao.createComment(content, res.locals.user.user_id, req.body.articleId);

  res.redirect(`/article?id=${req.body.articleId}`);
});

router.post("/newReply", async function (req, res) {
  const content = req.body.replyContent;
  await commentsDao.createReply(
    content,
    res.locals.user.user_id,
    req.body.articleId,
    req.body.commentId
  );

  res.redirect(`/article?id=${req.body.articleId}`);
});

router.get("/likeArticle", async function (req, res) {
  if (typeof res.locals.user != "undefined") {
    const articleId = req.query.id;
    const userId = res.locals.user.user_id;
    await likesDao.createNewLike(userId, articleId);
    res.redirect(`/article?id=${articleId}`);
  } else {
    res.setToastMessage("Please login to like articles.");
    res.redirect("/login");
  }
});

//get search results and render search results page
router.post("/searchResults", loginAdminVerification, async function (req, res) {
  res.locals.pageTitle = "Search Results";
  res.locals.searchTerm = req.body.search;

  res.locals.result = await searchDao.getSearchData(res.locals.searchTerm);
  const resultArray = await res.locals.result;
  if ((resultArray.length = 0)) {
    res.locals.noResult;
  } else {
    res.locals.searchResult = await searchDao.getSearchData(res.locals.searchTerm);
  }
  res.render("searchResults");
});

module.exports = router;
