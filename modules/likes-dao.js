const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//create new like 
async function createNewLike(userId, articleId){
    const db = await dbPromise;

    await db.run(SQL`
        insert into likes (user_id, article_id)
        values
        (${userId}, ${articleId})`);
}

//fetch all liked articles by a user
async function fetchLikedArticles(userId) {
    const db = await dbPromise;
    const result = await db.all(SQL`
        select article_id
        from likes
        where user_id = ${userId}`);
    return result;
}

//fetch all users liked a certain article
async function fetchLikedUsers(articleId) {
    const db = await dbPromise;
    const result = await db.all(SQL`
        select user_id
        from likes
        where article_id = ${articleId}`);
    return result;
}

module.exports = {
    createNewLike,
    fetchLikedArticles,
    fetchLikedUsers
};