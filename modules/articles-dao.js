const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//create functions to interact with article database

//fetch all articles
async function fetchAllArticles() {
  const db = await dbPromise;

  const allArticles = await db.all(SQL`   
    select article_id, title, date_published, content, image_id, likes_count, view_count, comment_count, user_id, username, first_name, last_name, avatar_path
    from articles  a, users u
    where a.author_id = u.user_id
    order by date_published desc;`);

  return allArticles;
}

//fetch an article with an article id
async function fetchArticle(id) {
  const db = await dbPromise;

  const article = await db.get(SQL`
    select article_id, title, date_published, content, image_id, likes_count, view_count, user_id, username, first_name, last_name, avatar_path, comment_count
    from articles  a, users u
    where a.author_id = u.user_id
    and article_id = ${id}`);

  return article;
}

//delete an article with an article id
async function deleteArticle(id) {
  const db = await dbPromise;
  
  await db.run(SQL`
    delete from articles
    where article_id = ${id}`);
}

//create new article, save data in database
async function createArticle(article) {
  const db = await dbPromise;

  const result = await db.run(SQL`
    insert into articles (title, content,image_id,author_id) 
    values
    (${article.title}, ${article.content}, ${article.image_id}, ${article.author_id})`);

  article.article_id = result.lastID;
}

//fetch article by author's user id
async function fetchArticleByAuthor(user_id) {
  const db = await dbPromise;

  const articles = await db.all(SQL`
    select * from articles
    where author_id = ${user_id}
    order by date_published desc;`);

  return articles;
}

//fetch comments by article id
async function fetchCommentsFromAticle(id) {
  const db = await dbPromise;

  const comments = await db.all(SQL`
    select comment_id, comment_date, content, author_id, article_id, parent_comment_id, user_id, first_name, last_name, username, avatar_path as commenter_avatar
    from comments c, users u
    where c.author_id = u.user_id
    and article_id = ${id}
    order by comment_date asc;`);

  return comments;
}

//update article data after editing
async function updateArticle(article) {
  const db = await dbPromise;

  await db.run(SQL`
    update articles
    set title = ${article.title}, content = ${article.content}, image_id = ${article.image_id}
    where article_id = ${article.article_id}`);
}

//update likes count of an article
async function updateLikes(article) {
  const db = await dbPromise;

  await db.run(SQL`
    update articles
    set likes_count = ${article.likes_count}
    where article_id = ${article.article_id}`);
}

//identify an article id with a comment id
async function fetchArticleIdByCommentId(commentId) {
  const db = await dbPromise;

  const articleId = db.get(SQL`
    select article_id
    from comments
    where comment_id = ${commentId}`);

  return articleId;
}

//update views count
async function updateViews(article) {
  const db = await dbPromise;

  await db.run(SQL`
    update articles
    set view_count = ${article.view_count + 1}
    where article_id = ${article.article_id}`);
}

//create and update comment count column  
async function articleCommentCount(article) {
  const db = await dbPromise;

  const count = await db.get(SQL`
    select count(*) comment_id
    from comments
    where article_id = ${article.article_id}`);

  await db.run(SQL`
    update articles
    set comment_count = ${count.comment_id}
    where article_id = ${article.article_id}`);
}

module.exports = {
  fetchAllArticles,
  fetchArticle,
  deleteArticle,
  fetchArticleByAuthor,
  createArticle,
  fetchCommentsFromAticle,
  updateArticle,
  fetchArticleIdByCommentId,
  updateLikes,
  updateViews,
  articleCommentCount,
};
