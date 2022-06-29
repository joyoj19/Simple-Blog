const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getSearchData(search) {
    const db = await dbPromise;

    // Search across articles and authors for searchText entered
        const searchResults = await db.all(SQL`
        select distinct a.*, u.first_name, u.last_name
        from articles a
        inner join users u
        on a.author_id = u.user_id
        where a.content like ${`%${search}%`} 
            or a.title like ${`%${search}%`}
            or u.first_name like ${`%${search}%`}
            or u.last_name like ${`%${search}%`}
            order by a.date_published desc`)
        return searchResults; 
}

module.exports = {
   getSearchData
};