import db from "../db/db.js";


async function verifyUserId(userId) {
    try {
        return db.query(
            `
         SELECT FROM users WHERE id = $1;
          `,
            [userId]
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}

async function insertComment(userId,text) {
    try {
        return db.query(
            `
          INSERT INTO comments (user_id,comment) VALUES ($1,$2);
          `,
            [userId,text]
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}

const commentRepository = {
    insertComment,
    verifyUserId
};


export default commentRepository;
