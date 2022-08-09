import db from "../db/db.js";

async function findHastag(hastag) {
  return db.query(`SELECT * FROM hastags WHERE "name" = $1`, [hastag]);
}


async function redirectHastag(hastag) {
  return db.query(`
  SELECT u.name, u.id AS user_id, u.picture, p.link, p.id as "postId", p.description, p.created_at 
  FROM  posts_hastgs pt
  JOIN posts p ON p.id = pt.post_id
  JOIN users u ON p.user_id = u.id
  JOIN hastags h ON h.id = pt.hastag_id
  WHERE h.name = $1
  `, [hastag]);
}

const hastagRepository = {
    findHastag,
    redirectHastag

}

export default hastagRepository;