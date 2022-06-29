const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function fetchAllUsers() {
  const db = await dbPromise;

  const allUsers = await db.all(SQL`
            select * from users`);

  return allUsers;
}

//fetch user from the db by username
async function fetchUser(username) {
  const db = await dbPromise;

  const user = await db.get(SQL`
        select * from users
        where username = ${username}`);

  return user;
}

//fetch user from the db by use id
async function fetchUserById(id) {
  const db = await dbPromise;

  const user = await db.get(SQL`
        select * from users
        where user_id = ${id}`);

  return user;
}

//add auth token to database
async function updateUser(user) {
  const db = await dbPromise;

  await db.run(SQL`
        update users
        set username = ${user.username}, password = ${user.password},
            first_name = ${user.first_name}, last_name = ${user.last_name}, email = ${user.email}, dob = ${user.dob}, 
            description = ${user.description}, avatar_path = ${user.avatar_path}, authToken = ${user.authToken}
        where user_id = ${user.user_id}`);
}

//create new user
async function createUser(user) {
  const db = await dbPromise;

  const result = await db.run(SQL`
        insert into users (username, password, first_name, last_name, email, dob, description, avatar_path) 
        values
        (${user.username}, ${user.password}, ${user.first_name}, ${user.last_name}, ${user.email}, ${user.dob}, 
        ${user.description},${user.avatar_path})`);

  // Get the auto-generated ID value, and assign it back to the user object.
  user.user_id = result.lastID;
}

//get user with authToken
async function getUserWithAuthToken(authToken) {
  const db = await dbPromise;

  const user = await db.get(SQL`
        select * from users
        where authToken = ${authToken}`);

  return user;
}

//delete user by user id
async function deleteUser(id) {
  const db = await dbPromise;

  const user = await db.run(SQL`
            delete from users
            where user_id = ${id}`);

  return user;
}

module.exports = {
  fetchUser,
  fetchUserById,
  updateUser,
  createUser,
  deleteUser,
  fetchAllUsers,
  getUserWithAuthToken,
};
