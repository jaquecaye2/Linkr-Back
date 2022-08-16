import db from "../db/db.js";

async function getUsersWithName(name) {
  const { rows: users } = await db.query(
    `
    SELECT id, name, email, picture
    FROM users
    WHERE name ILIKE $1
  `,
    [`%${name}%`]
  );

  return users;
}

async function getUsersWithId(id) {
  const { rows: users } = await db.query(
    `
    SELECT u.id, u.name, p.link, u.picture, p.description, p.id AS post_id, link_title, link_description, link_image 
    FROM users u
    JOIN posts P ON p.user_id = u.id
    WHERE u.id = $1
    ORDER BY p.id DESC LIMIT 20
  `,
    [id]
  );

  return users;
}

async function verifyUserId(id) {
  const { rows: isUserExistent } = await db.query(
    `
    SELECT * FROM users WHERE id = $1
  `,
    [id]
  );

  return isUserExistent;
}

async function checkFollow(followerId, userTargetId) {
  const {
    rows: [follow],
  } = await db.query(
    `
    SELECT user_id AS "followerId", followers_id AS "userTargetId"
    FROM follows
    WHERE user_id = $1 AND followers_id = $2
  `,
    [followerId, userTargetId]
  );

  return follow;
}

async function follow(followerId, userTargetId) {
  await db.query(
    `
    INSERT INTO follows (user_id, followers_id)
    VALUES ($1, $2)
  `,
    [followerId, userTargetId]
  );
}

async function unfollow(followerId, userTargetId) {
  await db.query(
    `
    DELETE FROM follows
    WHERE user_id = $1 AND followers_id = $2
  `,
    [followerId, userTargetId]
  );
}

export default {
  getUsersWithName,
  getUsersWithId,
  verifyUserId,
  checkFollow,
  follow,
  unfollow,
};
