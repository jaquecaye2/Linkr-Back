import db from "../db/db.js";

async function findHastag(hastag) {
  return db.query(`SELECT * FROM hastags WHERE name ILIKE $1`, [`%${hastag}%`]);
}


async function redirectHastag(hastag) {
  return db.query(`
  SELECT u.name, u.id AS user_id, u.picture, p.link, p.id as post_id, p.description, p.created_at , h.name AS hastag, link_title, link_description, link_image
  FROM  posts_hastgs pt
  JOIN posts p ON p.id = pt.post_id
  JOIN users u ON p.user_id = u.id
  JOIN hastags h ON h.id = pt.hastag_id
  WHERE h.name ILIKE $1
  `, [`%${hastag}%`]);
}


async function updateView(sum,hastag) {
  return db.query(`
  UPDATE hastags 
  SET views = $1
  WHERE name ILIKE $2
  `, [sum,`%${hastag}%`]);
}

async function rankingHastags(sum,hastag) {
  return db.query(`
  SELECT h.name FROM hastags h 
  GROUP BY h.id
  ORDER BY views DESC
  `, []);
}

const hastagRepository = {
    findHastag,
    redirectHastag,
    updateView,
    rankingHastags
}

export default hastagRepository;