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

export default { getUsersWithName };
