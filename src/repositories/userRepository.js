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


export default { getUsersWithName,getUsersWithId,verifyUserId };



