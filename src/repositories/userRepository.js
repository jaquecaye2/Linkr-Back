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

async function getUsersWithId(followerId, id) {
  const {
    rows: [user],
  } = await db.query(
    `
    SELECT 
      users.id,
      users.name,
      users.picture,
      CASE WHEN (SELECT COUNT(*) FROM follows WHERE user_id = $2 AND followers_id = $1) > 0 THEN true ELSE false END AS isFollowed,
      ARRAY(
        SELECT row_to_json(posts_row)
        FROM (
          SELECT posts.id, posts.link, posts.description, posts.link_title, posts.link_description, posts.link_image
          FROM posts
          WHERE posts.user_id = $1
          ORDER BY posts.created_at DESC
        ) posts_row
      ) AS posts
    FROM users
    WHERE users.id = $1
  `,
    [id, followerId]
  );

  return user;
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
