const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//create new comment 
async function createComment(content, userId, articleId) {
  const db = await dbPromise;

  const result = await db.run(SQL`
        insert into comments (comment_date, content, author_id, article_id)
        values
        (datetime('now'), ${content}, ${userId}, ${articleId})`);

  comment_id = result.lastID;
}

//delete comment by comment id
async function deleteComment(id) {
  const db = await dbPromise;

  await db.run(SQL`
            delete from comments
            where comment_id = ${id}`);
}

//create a reply for a certain comment
async function createReply(content, userId, articleId, parentCommentId) {
  const db = await dbPromise;

  const result = await db.run(SQL`
        insert into comments (comment_date, content, author_id, article_id, parent_comment_id)
        values
        (datetime('now'), ${content}, ${userId}, ${articleId}, ${parentCommentId})`);

  comment_id = result.lastID;
}

module.exports = {
  createComment,
  deleteComment,
  createReply,
};
