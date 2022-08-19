import db from "../db/db.js";

async function getUsersWithName(userId, name) {
  const { rows: users } = await db.query(
    `
    SELECT
      id,
      name,
      email,
      picture,
      CASE WHEN (SELECT COUNT(*) FROM follows WHERE user_id = $1 AND followers_id = id) > 0 THEN true ELSE false END AS "isFollowed"
    FROM users
    WHERE name ILIKE $2 AND id <> $1
    ORDER BY "isFollowed" DESC
    LIMIT 10
  `,
    [userId, `%${name}%`]
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
      CASE WHEN (SELECT COUNT(*) FROM follows WHERE user_id = $2 AND followers_id = $1) > 0 THEN true ELSE false END AS "isFollowed",
      ARRAY(
        SELECT row_to_json(posts_row)
        FROM (
          SELECT users.name, users.picture, posts.id, posts.link, posts.description, posts.link_title, posts.link_description, posts.link_image, COUNT(shares_post.post_id) AS countShared
          FROM posts
          JOIN users ON users.id = posts.user_id
          LEFT JOIN shares_post ON shares_post.post_id = posts.id
          WHERE posts.user_id = $1
          GROUP BY posts.id, users.id
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

async function getFollowedsIdsByUserId(userId) {
  const { rows: followedsIds } = await db.query(
    `
    SELECT followers_id AS "followedId"
    FROM follows
    WHERE user_id = $1
  `,
    [userId]
  );

  return followedsIds;
}

export default {
  getUsersWithName,
  getUsersWithId,
  verifyUserId,
  checkFollow,
  follow,
  unfollow,
  getFollowedsIdsByUserId,
};
