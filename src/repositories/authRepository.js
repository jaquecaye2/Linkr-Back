import db from "../db/db.js";

async function registeredUser(name, password_hash, email, pictureUrl) {
  try {
    return await db.query(
      `
        INSERT INTO users
        (name, email, password_hash, picture)
        VALUES ($1, $2, $3, $4)
        `,
      [name, email, password_hash, pictureUrl]
    );
  } catch (error) {
    return error.code;
  }
}

async function getUser(email) {
  try {
    return db.query(
      `
        SELECT * FROM users
        WHERE email=$1
        `,
      [email]
    );
  } catch (error) {
    return false;
  }
}

const authRepository = {
  registeredUser,
  getUser,
};
export default authRepository;
